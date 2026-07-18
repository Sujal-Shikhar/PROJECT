import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import SubjectForm from "../../components/subject/SubjectForm";

import {
  getSubjectById,
  updateSubject,
} from "../../api/subjectApi";

export default function EditSubject(){

  const {id}=useParams();

  const navigate=
    useNavigate();

  const [subject,
    setSubject]=
    useState(null);

  const [loading,
    setLoading]=
    useState(false);

  useEffect(()=>{

    load();

  },[]);

  const load=
    async()=>{

      const data=
        await getSubjectById(id);

      setSubject(
        data.subject
      );

    };

  const submit=
    async(values)=>{

      try{

        setLoading(true);

        await updateSubject(
          id,
          values
        );

        toast.success(
          "Subject updated"
        );

        navigate("/subjects");

      }

      catch(error){

        toast.error(
          error.response?.data?.message||
          "Update failed"
        );

      }

      finally{

        setLoading(false);

      }

    };

  if(!subject)
    return <div>Loading...</div>;

  return(

    <div>

      <h1 className="text-3xl font-bold mb-6">

        Edit Subject

      </h1>

      <SubjectForm
        defaultValues={subject}
        onSubmit={submit}
        loading={loading}
      />

    </div>

  );

}