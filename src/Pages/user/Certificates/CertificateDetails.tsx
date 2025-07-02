import { useEffect, useState, type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderBar from "../../../Layout/user/HeaderBar";
import { firestore } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {type  StatusType } from "../../../components/common/user/CertificateCard";
import Button from "../../../components/ui/button/Button";
import Loading from "../../../components/common/Loading";
import { toast } from "react-toastify";

interface CertificateRequest {
  id: string;
  certificateType: string;
  name: string;
  status: StatusType;
  createdAt: string;
  description: string;
}

const statusLabel: Record<StatusType, string> = {
  accepted: "Accepted",
  pending: "Pending",
  rejected: "Rejected"
};

const statusStyles: Record<StatusType, string> = {
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200", 
  rejected: "bg-red-50 text-red-700 border-red-200"
};

const statusIcons: Record<StatusType, string> = {
  accepted: "✓",
  pending: "⏳",
  rejected: "✕"
};

const CertificateDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<CertificateRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate(-1);
      return;
    }
    setLoading(true);
    const fetchCertificate = async () => {
      try {
        const ref = doc(firestore, "certificates", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          const cert: CertificateRequest = {
            id: snap.id,
            certificateType: data.certificateType ?? "Unknown",
            name: data.name ?? "",
            status: (data.status as StatusType) ?? "pending",
            createdAt: data.createdAt?.toDate?.().toLocaleDateString() ?? "",
            description: data.description ?? ""
          };
          setCertificate(cert);
        } else {
          setCertificate(null);
        }
      } catch (err) {
        setCertificate(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id, navigate]);

  const handleDownload = async () => {
  toast.success("Preparing your download...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <HeaderBar title="Certificate Details" />
      
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loading />
              <p className="text-slate-600 text-sm font-medium">Loading certificate details...</p>
            </div>
          </div>
        )}
        
        {!loading && !certificate && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Certificate Not Found</h3>
            <p className="text-slate-500 mb-6">The requested certificate could not be located.</p>
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        )}
        
        {!loading && certificate && (
          <div className="space-y-6">
            {/* Certificate Header Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-slate-800 leading-tight">
                        {certificate.certificateType}
                      </h1>
                      <p className="text-slate-600 font-medium">Digital Certificate</p>
                    </div>
                  </div>
                </div>
                
                
              </div>
              
              {/* Certificate Details Grid */}
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Recipient Name
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-slate-800">{certificate.name}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Issue Date
                    </label>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-semibold text-slate-800">{certificate.createdAt}</span>
                    </div>
                  </div>
                </div>
                
                {certificate.description && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Description
                    </label>
                    <div className="p-4 bg-slate-50 rounded-xl border">
                      <p className="text-slate-700 leading-relaxed">{certificate.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              {certificate.status === "accepted" ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Ready to Download</h3>
                    <p className="text-slate-600 mb-6">Your certificate has been approved and is ready for download.</p>
                  </div>
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Preparing Download...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Certificate
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-lg ${
                    certificate.status === "pending" 
                      ? "bg-gradient-to-br from-amber-400 to-orange-500" 
                      : "bg-gradient-to-br from-red-400 to-red-600"
                  }`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {certificate.status === "pending" ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {certificate.status === "pending" ? "Under Review" : "Request Rejected"}
                    </h3>
                    <p className="text-slate-600">
                      {certificate.status === "pending" 
                        ? "Your certificate request is being processed. You'll be able to download it once approved."
                        : "Your certificate request was not approved. Please contact support for more information."
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CertificateDetails;