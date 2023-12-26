import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormDetail from "@components/form/FormDetail";

function useRenderForm(dataRender, dependency) {
  const [itemRender, setItemRender] = useState([]);

  useEffect(() => {
    const renderElement = dataRender
      .filter((column) => {
        if (Object.prototype.hasOwnProperty.call(column, "hidden"))
          return column?.hidden;

        return column;
      })
      .map((data, key) => (
        <FormDetail
          key={key}
          col={data?.column || 24}
          title={data.title}
          text={data?.text}
          content={data?.content}
          link={data?.link}
          src={data?.src}
          propertyImg={data?.propertyImg}
        />
      ));

    setItemRender(renderElement);
  }, [dependency]);

  return itemRender;
}

export default useRenderForm;
