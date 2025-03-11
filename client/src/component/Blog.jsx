import { useEffect, useState } from "react";
import Loading from "./Loading";
import { getallblogdata } from "../ApiRequest/Api";

const Blog = () => {
  let [loading, setloading] = useState(false);
  const [blog, setblog] = useState([]);

  useEffect(() => {
    (async () => {
      setloading(true);
      let result = await getallblogdata();
      setblog(result);
      setloading(false);
    })();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <section className="container mx-auto px-4 py-8 text-gray-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blog.slice(0, 6).map((data) => (
            <div
              key={data.id}
              className="border border-red-800 p-4 rounded-lg shadow-lg bg-gray-900"
            >
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={data.img}
                />
              </div>
              <h2 className="title-font text-xl font-semibold text-gray-200 mt-4 mb-2">
                {data.title}
              </h2>
              <p className="leading-relaxed text-base text-gray-300">
                {data.des}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
