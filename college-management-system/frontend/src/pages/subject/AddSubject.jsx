import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import SubjectForm from "../../components/subject/SubjectForm";

import {
  createSubject,
} from "../../api/subjectApi";

export default function AddSubject() {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const submit =
    async (values)=>{

      try{

        setLoading(true);

        await createSubject(values);

        toast.success(
          "Subject created"
        );

        navigate("/subjects");

      }

      catch(error){

        toast.error(
          error.response?.data?.message||
          "Creation failed"
        );

      }

      finally{

        setLoading(false);

      }

    };

  return(

    <div>

      <h1 className="text-3xl font-bold mb-6">

        Add Subject

      </h1>

      <SubjectForm
        onSubmit={submit}
        loading={loading}
      />

    </div>

  );

}