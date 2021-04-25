import _ from "lodash";
import axios from "axios";
import "../css/post-publish.css";
import { logDOM } from "@testing-library/dom";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../global-context/UserContext";


export default function PostPublish(props) {
  const [imgFile, setImgFile] = useState([]);
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [countryName, setCountryName] = useState("Country");
  const [continentName, setContinentName] = useState("Continent");

  const [post, setPost] = useState({
    postDate: "",
    author: user,
    location: {
      continent: continentName,
      country: "",
      address: "",
    },
    title: "",
    content: "",
    images: [],
  });

   function redirectToPost(id) {
     props.history.push(`/post/${id}`);
   }

  function selectCountryName(e) {
    let countryName = e.target.value;
    setCountryName(countryName);
    post.location.country = e.target.value;
  }

  function selectContinentCode(e) {
    let continentCode = e.target.value;
    let selectedContinent =  continents.filter(continent => continent.code == continentCode);
    setContinentName(selectedContinent[0].name);
    post.location.continent = selectedContinent[0].name;
    queryCountries(continentCode);
  }



  function selectImgFiles(e) {
    let file = e.target.files[0];
    if(file != null && file != undefined){
      imgFileToUrl(file);
    }
    
  }

  async function publish() {
    let date = new Date();
    post.postDate =
      date.getFullYear().toString() +
      "-" +
      ((date.getMonth() + 1).toString().length == 2
        ? (date.getMonth() + 1).toString()
        : "0" + (date.getMonth() + 1).toString()) +
      "-" +
      (date.getDate().toString().length == 2
        ? date.getDate().toString()
        : "0" + date.getDate().toString()) +
      " " +
      (date.getHours().toString().length == 2
        ? date.getHours().toString()
        : "0" + date.getHours().toString()) +
      ":" +
      ((parseInt(date.getMinutes() / 5) * 5).toString().length == 2
        ? (parseInt(date.getMinutes() / 5) * 5).toString()
        : "0" + (parseInt(date.getMinutes() / 5) * 5).toString()) +
      ":00";

    if ((await saveImage()) == true) {
      await axios
        .post("http://localhost:5500/api/post/new", post, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.status === 200){
            console.log(res.data);
            
            redirectToPost(res.data.id)
          }
        })
        .catch((error) => error);
    }
  }

  async function saveImage() {
    let files = [];
    let form_data = new FormData();
    imgFile.map((file) => files.push(file.file));
    _.forEach(files, (file) => {
      form_data.append("imageFile", file);
    });

    let response = await axios
      .post("http://localhost:5500/api/post/uploadImage", form_data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => res)
      .catch((error) => error);

    if (response.status == 200) {
      response.data.forEach((file) => {
        post.images.push({ imagePath: file });
      });
      return true;
    }
  }


  function imgFileToUrl(file) {
    const reader = new FileReader();
    console.log("IMG FILE IN imgFileToUrl :", file);

    reader.onloadend = () => {
      let url = reader.result;
      let imgObj = { file: file, url: url };

      if (!isImgFileInList(url)) {
        setImgFile((currentArray) => [...currentArray, imgObj]);
      }
    };
    reader.readAsDataURL(file);
  }

  function isImgFileInList(imgUrl) {
    let isInList = false;
    imgFile.forEach((file) => {
      if (file.url == imgUrl) {
        isInList = true;
      }
    });
    return isInList;
  }

  function removeImg(e) {
    setImgFile((currentArray) =>
      imgFile.filter(
        (imgObj) => imgObj.url != e.target.parentElement.firstChild.src
      )
    );
  }

  function fileInputClick() {
    document.getElementById("fileInput").click();
  }

  useEffect(async () => {
    let data = await fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
                query {
                    continents{
                        name
                        code
                    }
                }
            `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data.data.continents;
      }).catch()
    setContinents(data);
  }, []);

  async function queryCountries(continentCode) {
    let data = await fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query {
                continent(code: "${continentCode}"){
                    countries{
                    name
                    }
                }
            }
            `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data.data.continent.countries;
      });

    setCountries(data);
  }

  return (
    <div>
      <div className="container mt-5 main-container pt-5 ">
        <div className="container mt-5 border rounded " id="bg-dark">
          <h3 className="p-3">New Post</h3>
          <div className="row">
            <div className="col-12 col-md-6 p-4">
              <div className="input-group mb-3">
                <input
                  onChange={(e) => {
                    post.title = e.target.value;
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Title..."
                  aria-label="Title..."
                  aria-describedby="button-addon2"
                ></input>
              </div>
              <div className="input-group mb-3">
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  placeholder="Content..."
                  onChange={(e) => {
                    post.content = e.target.value;
                  }}
                ></textarea>
              </div>
            </div>

            <div className="col-12  p-4">
              <div className="row d-flex align-items-center">
                <select
                  className="form-select m-2"
                  value="Continent"
                  onChange={(e) => selectContinentCode(e)}
                >
                  <option>{continentName}</option>
                  {continents.map((continent) => (
                    <option key={continent.code} value={continent.code}>
                      {continent.name}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select form-select-sm m-2 w-25"
                  value="Country"
                  onChange={selectCountryName}
                >
                  <option value="Country">{countryName}</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Address.."
                  className="form-control form-control-sm w-25 ml-2"
                  onChange={(e) => (post.location.address = e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row border-top mb-5">
            <h5 className="p-3">Media</h5>
            <div className="col-12">
              <div className="row">
                {imgFile.map((urlFile) => (
                  <div key={urlFile.url} className="ml-4">
                    <img
                      className="img-thumbnail border-1 p-0"
                      src={urlFile.url}
                    />
                    <i
                      className="bi bi-x rounded bg-danger"
                      onClick={removeImg}
                    ></i>
                  </div>
                ))}
                <div
                  onClick={fileInputClick}
                  className="rounded btn btn-secondary ml-4 add-img "
                >
                  <div>
                    <i className="bi bi-plus"></i>
                  </div>
                  <h6>Add Media</h6>
                </div>
              </div>
            </div>
            <input
              multiple
              className="imgInput"
              id="fileInput"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={selectImgFiles}
            />
          </div>
        </div>
        <div
          className="border mt-2 p-4 d-flex justify-content-end rounded"
          id="bg-dark"
        >
          <button
            onClick={() => publish()}
            className="rounded ml-5 btn-primary"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
