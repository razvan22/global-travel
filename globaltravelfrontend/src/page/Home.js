import React, { useEffect, useState } from "react";
import axios from "axios";
import PostComponent from "../components/PostComponent";

export default function HomeView() {
  const [postList, setList] = useState([]);

  useEffect(async () => {
    let data = await axios
      .get("http://localhost:5500/api/post")
      .then((res) => {
        setList([]);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setList(data);
  }, []);

  return (
    <div>
      <section>
        {postList.map((post) => (
          <PostComponent post={post} key={post.id} />
        ))}
      </section>
    </div>
  );
}
