import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorProfile } from "../../../api/profiles/doctor";
import DoctorProfile from "../components/DoctorProfile";
import DoctorSchedule from "../components/DoctorSchedule";

export default function DoctorProfilePage() {
  const { doctorId } = useParams(); // استقبل الـ id من ال URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const data = await getDoctorProfile(doctorId); // نجيب بيانات الدكتور
        setDoctor(data);
        console.log(data)
      } catch (err) {
        console.error("Failed to fetch doctor:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) fetchDoctor();
  }, [doctorId]);

  if (loading) return <div className="text-center p-20">Loading...</div>;
  if (error) return <div className="text-center p-20 text-red-500">Error: {error}</div>;
  if (!doctor) return <div className="text-center p-20">No doctor found</div>;

  return (
    <>
      <DoctorProfile doctor={doctor} />
      <DoctorSchedule doctorId={doctorId} />
    </>
  );
}
