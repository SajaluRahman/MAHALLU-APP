import { useEffect, useState, type FC } from "react";
import Button from "../../../components/ui/button/Button";
import HeaderBar from "../../../Layout/user/HeaderBar";
import { Modal } from "../../../components/ui/Modal/index";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import { ButtonForm } from "../../../components/form/ButtonForm";
import Form from "../../../components/form/Form";
import { toast } from "react-toastify";
import { addDoc, collection, query, where, onSnapshot, type DocumentData } from "firebase/firestore";
import { firestore } from "../../../firebase/firebaseConfig";
import { useUserAuth } from "../../../context/user/userAuthContext";
import CertificateCard from "../../../components/common/user/CertificateCard";
// ----- UI constants -----
const CERTIFICATE_TYPES = [
  { label: "Maarage Certificate", value: "maarage" },
  { label: "Mahallu Clearance", value: "mahallu" },
  { label: "Other Certificate", value: "other" },
];


// ----- Types -----
type StatusType = "pending" | "accepted" | "rejected";

interface CertificateRequest {
  id: string;
  certificateType: string;
  name: string;
  status: StatusType;
  createdAt: string;
  description: string;
}

// ----- Utility function -----

// ----- Components -----
const CertificateIcon = () => (
  <span role="img" aria-label="certificate" className="text-xl mr-2">📜</span>
);


const CertificateRequestModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}> = ({ isOpen, onClose, onSelect }) => (
  <Modal isOpen={isOpen} onClose={onClose} className="max-w-xs mx-auto py-6 px-4" showCloseButton>
    <div className="text-lg font-bold text-gray-700 mb-5 text-center">Request Certificate</div>
    <div className="flex flex-col gap-3">
      {CERTIFICATE_TYPES.map((cert) => (
        <Button
          key={cert.value}
          variant="bg_lener"
          className="w-full py-2 text-base font-semibold"
          onClick={() => onSelect(cert.value)}
        >
          {cert.label}
        </Button>
      ))}
    </div>
  </Modal>
);

const CertificateRequestForm: FC<{
  type: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ type, isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const { familyId, user } = useUserAuth();

  const certificateLabel =
    CERTIFICATE_TYPES.find((c) => c.value === type)?.label || "Certificate";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !desc) {
      toast.error("Fill all the fields");
      return;
    }
    try {
      await addDoc(collection(firestore, "certificates"), {
        certificateType: certificateLabel,
        name,
        description: desc,
        createdAt: new Date(),
        status: "pending",
        familyId,
        userId: user?.uid,
      });
      toast.success("Requested");
      setDesc("");
      setName("");
      onClose();
    } catch (error) {
      console.error("Error in requesting certificates", error);
      toast.error("Request failed");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xs mx-auto py-6 px-4" showCloseButton>
      <div className="text-lg font-bold text-gray-700 my-5 text-center">
        Request {certificateLabel}
      </div>
      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Name of person</label>
          <Input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Description</label>
          <TextArea
            value={desc}
            onChange={setDesc}
            placeholder="Reason/description"
            rows={3}
          />
        </div>
        <ButtonForm
          type="submit"
          variant="bg_lener"
          className="w-full py-2 text-base font-semibold mt-2"
        >
          Submit Request
        </ButtonForm>
      </Form>
    </Modal>
  );
};

// ----- Main Page -----
const MyCertificates: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<CertificateRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { familyId } = useUserAuth();
  const navigate = useNavigate();

  // Fetch family's certificates
  useEffect(() => {
    if (!familyId) return;
    setLoading(true);
    const q = query(
      collection(firestore, "certificates"),
      where("familyId", "==", familyId),
      where("status", "in", ["pending", "accepted", "rejected"])
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data: CertificateRequest[] = querySnapshot.docs.map(doc => {
        const d = doc.data() as DocumentData;
        return {
          id: doc.id,
          certificateType: d.certificateType ?? "Unknown",
          name: d.name ?? "",
          status: (d.status as StatusType) ?? "pending",
          createdAt: d.createdAt?.toDate?.().toLocaleDateString() ?? "",
          description: d.description ?? "",
        };
      }).sort((a, b) => {
        // Accepted first, then pending, then rejected, then by most recent
        const order: StatusType[] = ["accepted", "pending", "rejected"];
        if (a.status !== b.status) {
          return order.indexOf(a.status) - order.indexOf(b.status);
        }
        return (b.createdAt || "").localeCompare(a.createdAt || "");
      });
      console.log("cert",data);
      
      setCertificates(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [familyId]);

  return (
    <div className="relative min-h-dvh bg-gray-100 pb-8">
      <HeaderBar title="My Certificates" />
      <main className="px-4 pt-4 max-w-sm mx-auto">
        <div className="flex items-center justify-between ">
          <div className="flex items-center font-semibold text-base text-gray-700">
            <CertificateIcon />
            Available Certificates
          </div>
          <Button
            className="text-sm font-semibold"
            variant="bg_lener"
            onClick={() => setModalOpen(true)}
          >
            + Noc
          </Button>
        </div>
        <div className="py-3 mb-12">
          <button
            onClick={() => navigate("/request-history")}
            className="float-end text-stone-500 underline"
          >
            Request History
          </button>
        </div>
        {loading && <div className="text-center text-gray-400 py-10">Loading...</div>}
        {!loading && certificates.filter(cert => cert.status === "accepted").length === 0 && (
          <div className="text-center text-gray-400 py-10">No certificate requests found.</div>
        )}
        
        {certificates
          .filter(cert => cert.status === "accepted")
          .map(cert => (
            <CertificateCard
              onClick={() => navigate(`/certificate/${cert.id}`)}
              key={cert.id}
              status={cert.status}
              title={cert.certificateType}
              desc={cert.description}
              issuedOrReq="Accepted"
              date={cert.createdAt}
            />
          ))}
      </main>
      {/* Modal for certificate type selection */}
      <CertificateRequestModal
        isOpen={modalOpen && !formType}
        onClose={() => setModalOpen(false)}
        onSelect={type => setFormType(type)}
      />
      {/* Modal for form input */}
      <CertificateRequestForm
        type={formType ?? ""}
        isOpen={!!formType}
        onClose={() => {
          setFormType(null);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default MyCertificates;