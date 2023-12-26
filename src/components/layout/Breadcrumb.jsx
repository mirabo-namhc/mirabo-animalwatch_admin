import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";

function BreadcrumbComp({ breadcrumbNameData }) {
  const location = useLocation();
  const LAST_PAGE = 1;

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  //
  const listPath = pathSnippets.includes("detail")
    ? pathSnippets.slice(0, pathSnippets.indexOf("detail") + 1)
    : pathSnippets;

  const extraBreadcrumbItems = listPath.map((_, index) => {
    const url = `/${listPath.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {index === LAST_PAGE ? (
          <span>{breadcrumbNameData[url]}</span>
        ) : (
          <Link to={url}>{breadcrumbNameData[url]}</Link>
        )}
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [].concat(extraBreadcrumbItems);
  return (
    <div className="mb-15">
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  );
}

BreadcrumbComp.propTypes = {
  breadcrumbNameData: PropTypes.object,
};

export default BreadcrumbComp;
