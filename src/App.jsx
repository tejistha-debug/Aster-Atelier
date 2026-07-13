import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc
} from "firebase/firestore";

import { db } from "./firebase";

import servicesBg from "./assets/services-bg.png";
import architectureBg from "./assets/architecture-bg.jpg";
import { useState, useEffect } from "react";
export default function App() {
  const [entered, setEntered] = useState(false);
  const [page, setPage] = useState(0);

  const pages = [
    <AboutPage />,
    <ServicesPage />,
    <PortfolioPage />,
  ];

  const nextPage = () => {
    setPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  return (
    <>
      {!entered ? (
        <Intro onEnter={() => setEntered(true)} />
      ) : (
        <MainSite
          page={pages[page]}
          onNext={nextPage}
          onBack={prevPage}
        />
      )}
    </>
  );
}

function Intro({ onEnter }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);

    setTimeout(() => {
      onEnter();
    }, 1400);
  };

  return (
    <div className="h-screen bg-[#111921] flex items-center justify-center overflow-hidden">

      <div
        onClick={handleClick}
        className="
          relative
          w-56
          h-96
          cursor-pointer
          perspective-[2000px]
        "
      >

        {/* OUTER FRAME */}
        <div className="absolute inset-0 border-[6px] border-[#7E632E] rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.7)] z-30" />

        {/* LEFT DOOR */}
        <div
          className={`
            absolute
            left-0
            top-0
            w-1/2
            h-full
            bg-[#D8CEB9]
            border-r
            border-[#7E632E]
            origin-left
            transition-all
            duration-[1400ms]
            ease-in-out
            shadow-inner
            ${open ? "-translate-x-full rotate-y-[-35deg]" : ""}
          `}
        />

        {/* RIGHT DOOR */}
        <div
          className={`
            absolute
            right-0
            top-0
            w-1/2
            h-full
            bg-[#B3B2B3]
            border-l
            border-[#7E632E]
            origin-right
            transition-all
            duration-[1400ms]
            ease-in-out
            shadow-inner
            ${open ? "translate-x-full rotate-y-[35deg]" : ""}
          `}
        />
        {/* TEXT */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <p className="text-[#111921] tracking-[0.5em] text-sm uppercase">
            Enter
          </p>
        </div>

      </div>

    </div>
  );
}

function MainSite({ page, onNext, onBack }) {

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (
    <div
      className="
        min-h-screen
        bg-[#F5F3EF]
        relative
        overflow-x-hidden
        scroll-smooth
      "
    >

      {/* PAGE CONTENT */}
      <div className="min-h-screen">
        {page}
      </div>

      {/* NAVIGATION */}
      <div
        className={`
          fixed
          bottom-14
          w-full
          flex
          justify-between
          px-40
          pointer-events-none
          transition-all
          duration-500
          z-40

          ${
            showNav
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }
        `}
      >

        {/* BACK */}
        <button
          onClick={onBack}
          className="
            flex
            items-center
            gap-3
            text-[#7E632E]
            hover:-translate-x-1
            transition
            duration-300
            pointer-events-auto
          "
        >
          <span className="text-5xl">←</span>

          <span className="uppercase tracking-[0.2em] text-sm">
            Back
          </span>
        </button>

        {/* NEXT */}
        <button
          onClick={onNext}
          className="
            flex
            items-center
            gap-3
            text-[#7E632E]
            hover:translate-x-1
            transition
            duration-300
            pointer-events-auto
          "
        >
          <span className="uppercase tracking-[0.2em] text-sm">
            Next
          </span>

          <span className="text-5xl">→</span>
        </button>

      </div>

    </div>
  );
}

function AboutPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

      {/* MAIN BACKGROUND IMAGE */}
      <img
        src={architectureBg}
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          opacity-40
          pointer-events-none
          select-none
        "
      />

      {/* TOP LEFT LINE */}
      <div className="
        absolute
        top-16
        left-20
        w-80
        h-[1px]
        bg-[#7E632E]
        opacity-40
        rotate-[10deg]
      " />

      {/* BOTTOM RIGHT LINE */}
      <div className="
        absolute
        bottom-28
        right-24
        w-80
        h-[1px]
        bg-[#7E632E]
        opacity-30
        rotate-[-10deg]
      " />

      {/* LEFT DRAWING FRAME */}
      <div className="
        absolute
        left-24
        bottom-32
        w-64
        h-64
        border
        border-[#D8CEB9]
        backdrop-blur-[1px]
        overflow-hidden
      ">

        <img
          src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800&auto=format&fit=crop"
          alt=""
          className="
            w-full
            h-full
            object-cover
            opacity-30
            grayscale
          "
        />

      </div>

      {/* RIGHT DRAWING FRAME */}
      <div className="
        absolute
        right-24
        top-40
        w-56
        h-56
        border
        border-[#D8CEB9]
        overflow-hidden
      ">

        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"
          alt=""
          className="
            w-full
            h-full
            object-cover
            opacity-30
            grayscale
          "
        />

      </div>

      {/* CENTER CONTENT */}
      {/* CONTENT */}
<div className="relative z-10 text-center max-w-2xl">

  {/* CLOUD BACKGROUND */}
  <div
    className="
      absolute
      inset-0
      -z-10
      blur-3xl
      opacity-90
      bg-[radial-gradient(circle,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_40%,rgba(255,255,255,0)_75%)]
      scale-[1.8]
    "
  />
        {/* SMALL LABEL */}
        <p className="
          uppercase
          tracking-[0.5em]
          text-[#7E632E]
          text-sm
          mb-8
        ">
          Remote Architecture Practice
        </p>

        {/* TITLE */}
        <h1 className="
          text-6xl
          md:text-7xl
          text-[#111921]
          mb-10
          tracking-tight
          leading-none
        ">
          Aster Atelier
        </h1>

        {/* DESCRIPTION */}
        <p className="
          text-[#253847]
          text-xl
          leading-loose
          max-w-3xl
          mx-auto
        ">
          Drafting, visualization, concept modeling,
          presentation design, and architectural support
          for studios, students, and independent projects.
        </p>

      </div>
      {/* CONTACT STRIP */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          bg-[#0D0D0D]
          border-t
          border-[#D8CEB9]/20
          z-20
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-10
            py-5
            flex
            flex-col
            md:flex-row
            items-center
            justify-center
            gap-8
          "
        >
          {/* EMAILS */}
          <div className="text-center md:text-right">
            <p
              className="
                text-[#D8CEB9]
                uppercase
                tracking-[0.3em]
                text-[11px]
                mb-1
              "
            >
              Email
            </p>

            <a
              href="mailto:vptejistha@gmail.com"
              className="block text-white text-sm tracking-wide hover:text-[#D8CEB9] transition"
            >
              vptejistha@gmail.com
            </a>

            <a
              href="mailto:tejistha.250barch048@sushantuniversity.edu.in"
              className="block text-white/80 text-sm tracking-wide hover:text-[#D8CEB9] transition"
            >
              tejistha.250barch048@sushantuniversity.edu.in
            </a>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-[#D8CEB9]/60" />

          {/* Phone */}
          <div className="text-center md:text-left">
            <p
              className="
                text-[#D8CEB9]
                uppercase
                tracking-[0.3em]
                text-[11px]
                mb-1
              "
            >
              Contact
            </p>

            <a
              href="tel:+919599658672"
              className="text-white text-sm tracking-wide hover:text-[#D8CEB9] transition"
            >
              +91 95996 58672
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
function ServicesPage() {
  return (
    <div
  className="
    min-h-screen
    w-full
    flex
    flex-col
    items-center
    justify-center
    relative
    overflow-hidden
  "
>

  {/* BACKGROUND IMAGE */}
  <img
    src={servicesBg}
    alt=""
    className="
  absolute
  inset-0
  w-full
  h-full
  object-contain
  scale-150
  opacity-30
  pointer-events-none
  select-none
"
   />
      <div className="relative z-10 flex flex-col items-center">

      <h1 className="text-5xl text-[#111921] mb-16">
       Services
       </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div className="bg-[#D8CEB9] p-10 rounded-2xl w-[320px]">
          <h2 className="text-2xl mb-5 text-[#111921]">
            Drafting
          </h2>

          <p className="text-[#253847] leading-relaxed">
            CAD drawings, plans, sections and elevations.
          </p>
        </div>

        <div className="bg-[#B3B2B3] p-10 rounded-2xl w-[320px]">
          <h2 className="text-2xl mb-5 text-[#111921]">
            3D Modeling
          </h2>

          <p className="text-[#253847] leading-relaxed">
            SketchUp concept models.
          </p>
        </div>

        <div className="bg-[#7E632E] p-10 rounded-2xl w-[320px]">
          <h2 className="text-2xl mb-5 text-white">
            Rendering
          </h2>

          <p className="text-white leading-relaxed">
            D5 Render visualizations and atmospheric imagery.
          </p>
        </div>

      </div>
      </div>
      </div>
   );
}
import {
  CLOUD_NAME,
  UPLOAD_PRESET,
} from "./cloudinary";
function PortfolioPage() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(
  localStorage.getItem("adminUnlocked") === "true"
);

  const [projects, setProjects] = useState([]);

useEffect(() => {
  const loadProjects = async () => {
    const snapshot =
      await getDocs(
        collection(db, "projects")
      );

    const data =
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    setProjects(data);
  };

  loadProjects();
}, []);
  return (
    <div className="max-w-6xl w-full relative mx-auto">

      {/* TITLE */}
      <h1 className="text-5xl text-[#111921] mb-12 text-center mt-20">
        Portfolio
      </h1>

      {/* SMALL ADMIN BUTTON */}
      <button
        onClick={() => setShowAdmin(true)}
        className="
          absolute
          top-0
          right-0
          text-xs
          tracking-[0.3em]
          uppercase
          text-[#7E632E]
          opacity-40
          hover:opacity-100
          transition
        "
      >
        Admin
      </button>

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-2 gap-8">

        {projects.map((project, index) => (

          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              overflow-hidden
              border
              border-[#D8CEB9]
              shadow-lg
              hover:shadow-2xl
              transition
              duration-300
            "
          >

            {/* THUMBNAIL */}
            <img
              src={project.thumbnail}
              alt={project.title}
              className="
                w-full
                h-64
                object-cover
              "
            />

            {/* CONTENT */}
            <div className="p-6">

              <h2 className="text-2xl text-[#111921]">
                {project.title}
              </h2>

              <p className="text-[#253847] mt-3">
                {project.description}
              </p>

             {/* BUTTONS */}
<div className="flex gap-3 mt-6 flex-wrap">

  {/* OPEN PDF */}
  <a
    href={project.file}
    target="_blank"
    rel="noopener noreferrer"
    className="
      bg-[#253847]
      text-white
      px-5
      py-2
      rounded-lg
    "
  >
    Open PDF
  </a>

  {/* ADMIN ONLY BUTTONS */}
  {adminUnlocked === true && (

    <>

      {/* EDIT */}
      <button
        onClick={() => {

          const adminPassword =
            prompt("Enter admin password");

          if (adminPassword !== "tsstudio123") {
            alert("Access denied");
            return;
          }

          setShowAdmin(true);

          localStorage.setItem(
            "editingProject",
            JSON.stringify(project)
          );
        }}
        className="
          bg-[#7E632E]
          text-white
          px-5
          py-2
          rounded-lg
        "
      >
        Edit
      </button>

      {/* DELETE */}
      <button
  onClick={async () => {

    const adminPassword =
      prompt("Enter admin password");

    if (adminPassword !== "tsstudio123") {
      alert("Access denied");
      return;
    }

    const confirmed =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmed) return;

    await deleteDoc(
      doc(
        db,
        "projects",
        project.id
      )
    );

    setProjects(
      projects.filter(
        (p) => p.id !== project.id
      )
    );

  }}
  className="
    bg-[#111921]
    text-white
    px-5
    py-2
    rounded-lg
  "
>
  Delete
</button>

    </>

  )}

</div>

            </div>

          </div>

        ))}

      </div>

      {/* ADMIN MODAL */}
      {showAdmin && (
        <AdminPanel
  onClose={() => setShowAdmin(false)}
  projects={projects}
  setProjects={setProjects}
  setAdminUnlocked={setAdminUnlocked}
/>
      )}

    </div>
  );
}

function AdminPanel({
  onClose,
  projects,
  setProjects,
  setAdminUnlocked,
}) {

  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const editingProject = JSON.parse(
    localStorage.getItem("editingProject")
  );

  const [title, setTitle] = useState(
    editingProject?.title || ""
  );

  const [description, setDescription] = useState(
    editingProject?.description || ""
  );

  const [file, setFile] = useState(
    editingProject?.file || ""
  );

  const [thumbnail, setThumbnail] = useState(
    editingProject?.thumbnail || ""
  );

 const addProject = async () => {

  if (!title || !description || !file)
    return;

  const projectData = {
    title,
    description,
    file,
    thumbnail,
  };

  try {

    if (editingProject?.id) {

      await updateDoc(
        doc(
          db,
          "projects",
          editingProject.id
        ),
        projectData
      );

      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? {
                ...projectData,
                id: p.id,
              }
            : p
        )
      );

    } else {

      const newDoc =
        await addDoc(
          collection(
            db,
            "projects"
          ),
          projectData
        );

      setProjects([
        ...projects,
        {
          id: newDoc.id,
          ...projectData,
        },
      ]);
    }

    localStorage.removeItem(
      "editingProject"
    );

    setTitle("");
    setDescription("");
    setFile("");
    setThumbnail("");

    onClose();

  } catch (err) {

    console.log(err);

    alert(
      "Could not save project."
    );
  }
};

  return (
    <div className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-[#F5F3EF]
        p-10
        rounded-2xl
        w-[500px]
        shadow-2xl
      ">

        {!authenticated ? (

          <div className="space-y-4">

            <h2 className="text-2xl text-[#111921]">
              Admin Access
            </h2>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                border
              "
            />

            <button
              onClick={() => {
                if (password === "tsstudio123") {
                  setAuthenticated(true);

                localStorage.setItem(
                "adminUnlocked",
                "true"
              );

              setAdminUnlocked(true);
                } else {
                  alert("Wrong password");
                }
              }}
              className="
                bg-[#253847]
                text-white
                px-6
                py-3
                rounded-lg
              "
            >
              Enter
            </button>

          </div>

        ) : (

          <div className="space-y-4">

            <div className="
              flex
              justify-between
              items-center
            ">

              <h2 className="text-2xl text-[#111921]">
                {editingProject
                  ? "Edit Project"
                  : "Add Project"}
              </h2>

              <button
                onClick={() => {
                  localStorage.removeItem(
                    "editingProject"
                  );

                  onClose();
                }}
                className="text-xl"
              >
                ✕
              </button>

            </div>

            {/* TITLE */}
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                border
              "
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="
                w-full
                p-3
                rounded-lg
                border
                h-28
              "
            />

           {/* PDF */}
<input
  type="file"
  accept="application/pdf"
  onChange={async (e) => {

    const uploadedFile =
      e.target.files[0];

    if (!uploadedFile) return;

    const formData =
      new FormData();

    formData.append(
      "file",
      uploadedFile
    );

    formData.append(
      "upload_preset",
      UPLOAD_PRESET
    );

    try {

      const response =
        await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
  await response.json();

console.log(data);

const pdfURL =
  data.secure_url;

setFile(pdfURL);

const thumbnailURL =
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/pg_1/${data.public_id}.jpg`;

setThumbnail(thumbnailURL);

      // AUTOMATIC FIRST PAGE THUMBNAIL

    } catch (err) {

      console.error(err);

      alert(
        "PDF upload failed"
      );
    }
  }}
  className="
    w-full
    p-3
    rounded-lg
    border
    bg-white
  "
/>
            {/* SAVE */}
            <button
              onClick={addProject}
              className="
                bg-[#253847]
                text-white
                px-6
                py-3
                rounded-lg
              "
            >
              {editingProject
                ? "Save Changes"
                : "Add Project"}
            </button>

          </div>

        )}

      </div>

    </div>
  );
}