import { useState, type FC } from "react";
import HeaderBar from "../../Layout/user/HeaderBar";
import Input from "../../components/form/input/InputField";
import Form from "../../components/form/Form";
import TextArea from "../../components/form/input/TextArea";
import { ButtonForm } from "../../components/form/ButtonForm";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseConfig";

const ComplaintBox: FC = () => {
  const [name, setName] = useState("");
  const [comp_description, setComp_description] = useState("");

  const handleComplaintSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comp_description) {
      toast.error("fill the fields");
      return;
    }

    try {
      await addDoc(collection(firestore, "complaints"), {
        name: name,
        complaints: comp_description,
        createdAt: new Date(),
      });
      toast.success("complaint sumbmited");
      setName("");
      setComp_description("");

    } catch (error) {
      console.error("Error in adding complaint", error);
    }
  };

  return (
    <div className="min-h-dvh bg-gray-100 ">
      <HeaderBar title="Complaints" />

      <div className=" mx-auto px-8 py-20">
        <Form onSubmit={handleComplaintSumbit} className=" flex flex-col gap-4">
          <Input
          value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className=""
            name="name_of_the_person"
            placeholder="enter your name"
          />
          <TextArea value={comp_description} onChange={setComp_description} />
          <ButtonForm variant="bg_lener" type="submit">
        
            Submit
          </ButtonForm>
        </Form>
      </div>
    </div>
  );
};

export default ComplaintBox;
