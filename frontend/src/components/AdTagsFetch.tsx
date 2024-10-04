import axios from "axios";
import { Fragment, useEffect, useState } from "react";

type Tags = {
  id: number;
  name: string;
};

const AdTagsFetch = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      const result = await axios.get<Tags[]>("http://localhost:3000/tags/");
      setTags(result.data);
    };
    fetchTags();
  }, []);
  return (
    <>
      <div>
        {tags.map((tag) => (
          <Fragment key={tag.id}>
            <p>{tag.name}</p>
            <p>{tag.id}</p>
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default AdTagsFetch;
