import Head from "next/head";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Drawer from "@/components/Drawer";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import style from "@/styles/Users.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Users({ dataUsers }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(100);
  const [drawer, setDrawer] = useState(false);
  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    status: "active",
  });
  const [users, setUsers] = useState([]);
  const BASE_URL = "https://gorest.co.in/public/v2/users";
  const headers = {
    Authorization:
      "Bearer 750bec88007091bf0a359b506d9a02d652f3894cd9e65b06d5ff97fff166aade",
  };

  // GET USERS BY PAGE
  const getUsers = async () => {
    const response = await axios.get(
      `${BASE_URL}?page=${page}&per_page=${limit}`
    );
    setUsers(response.data.reverse());
    setPage(page);
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  const handleChange = (e) => {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  };

  // SUBMIT DATA
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = [...users];
    //validation required field
    if (
      formData.name == "" ||
      formData.email == "" ||
      formData.gender == "" ||
      formData.status == ""
    ) {
      alert("isi semua data!");
      return false;
    }

    //validation handleSubmit for isUpdate or not
    if (isUpdate.status) {
      data.map((user) => {
        if (user.id === isUpdate.id) {
          (user.name = formData.name),
            (user.email = formData.email),
            (user.gender = formData.gender),
            (user.status = formData.status);
        }
      });
      //UPDATE DATA API
      axios
        .put(
          `${BASE_URL}/${isUpdate.id}`,
          {
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            status: formData.status,
          },
          {
            headers,
          }
        )
        .then(() => {
          toast.success("Berhasil update data", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      let user = {
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        status: formData.status,
      };
      //TAMBAH DATA KE API
      axios
        .post(`${BASE_URL}`, user, {
          headers,
        })
        .then((res) => {
          toast.success("Berhasil menambahkan data", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          data.push(res.data);
          setUsers(data);
          return;
        })
        .catch((error) => {
          toast.error(
            `${error.response.data[0].field} ${error.response.data[0].message}`,
            {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return false;
        });
    }
    // SET BACK TO ZERO
    setFormData({
      name: "",
      email: "",
      gender: "male",
      status: "active",
    });
    setIsUpdate({
      id: null,
      status: false,
    });
    setDrawer(false);
  };

  // UPDATE DATA
  const handleUpdate = (userId) => {
    let data = [...users];
    // Mencari data yang sama
    let foundData = data.find((user) => user.id === userId);
    setIsUpdate({ id: userId, status: true });
    setFormData({
      name: foundData.name,
      email: foundData.email,
      gender: foundData.gender,
      status: foundData.status,
    });
    setDrawer(true);
  };

  // HAPUS DATA
  const handleDelete = (userId) => {
    let data = [...users];
    let filtered = data.filter((user) => user.id !== userId);
    axios
      .delete(`${BASE_URL}/${userId}`, {
        headers,
      })
      .then(() => {
        toast.success("Berhasil hapus data", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    setUsers(filtered);
  };

  // OPEN DRAWER UNTUK TAMBAH DATA
  const addUser = () => {
    setDrawer(true);
  };

  // CLOSE DRAWER
  const handleCloseDrawer = () => {
    setFormData({
      name: "",
      email: "",
      gender: "male",
      status: "active",
    });
    setIsUpdate({
      id: null,
      status: false,
    });
    setDrawer(false);
  };

  // GANTI HALAMAN
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <>
      <Head>
        <title>Users | Synapsis Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Navigation />
        <div className={style.users}>
          <div
            className={`${style.button} ${style.add_user}`}
            onClick={() => addUser()}
          >
            Add User
          </div>
          <div className={style.table_wrap}>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {page === 1 ? index + 1 : page * 10 - 10 + (index + 1)}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.status}</td>
                    <td className={style.actions}>
                      <div
                        className={`${style.button} ${style.edit_user}`}
                        onClick={() => handleUpdate(user.id)}
                      >
                        Edit
                      </div>
                      <div
                        className={`${style.button} ${style.delete_user}`}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            page {page} of {pages}
          </p>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pages}
            onPageChange={changePage}
            containerClassName={style.container_paginate}
            pageLinkClassName={style.page_link_paginate}
            previousLinkClassName={style.previous_paginate}
            nextLinkClassName={style.next_paginate}
            activeLinkClassName={style.active_paginate}
            disabledLinkClassName={style.disabled_paginate}
          />
        </div>
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
      <Drawer isOpen={drawer} isUserPage>
        <div className={style.close_button} onClick={handleCloseDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-square-x"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M10 10l4 4m0 -4l-4 4"></path>
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="enter name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                type="email"
                className="input"
                placeholder="enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Gender</label>
            <div className="control">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <button className={style.button_save} type="submit">
            Save
          </button>
        </form>
      </Drawer>
    </>
  );
}

// export const getServerSideProps = async () => {
//   const data = await axios
//     .get("https://gorest.co.in/public/v2/users?page=1&per_page=20")
//     .then((res) => res.data);
//   return {
//     props: {
//       dataUsers: data,
//     },
//   };
// };
