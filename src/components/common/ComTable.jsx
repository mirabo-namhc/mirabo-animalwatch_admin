import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Input, Row, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Search } = Input;
function ComTable({
  title,
  loading,
  rowSelection,
  maxWidth = 1500,
  className,
  tableLayout,
  pagination,
  placeholderSearch,
  iconAdd = <PlusOutlined />,
  propsBtnAdd,
  columns = [],
  data = [],
  onAddTable,
  onSearch,
  onChangeSearch,
  onClickRow = () => null,
  onChangeTable,
  groupsBtn = () => null,
}) {
  return (
    <>
      <Row className="header-table" align="middle">
        <Col sm={12}>
          <Row align="middle">
            <h1 className="full-width title-table">{title}</h1>
          </Row>
        </Col>
        <Col sm={12}>
          <Row justify="end">
            {typeof onSearch === "function" && (
              <Search
                className="table-input-search"
                allowClear
                placeholder={placeholderSearch}
                onSearch={onSearch}
                onChange={onChangeSearch}
              />
            )}
            {typeof onAddTable === "function" && (
              <Button onClick={onAddTable} {...propsBtnAdd}>
                {iconAdd}
              </Button>
            )}
            {groupsBtn()}
          </Row>
        </Col>
      </Row>
      <Table
        showHeader
        showfooter
        bordered
        rowSelection={rowSelection}
        className={className}
        loading={loading}
        tableLayout={tableLayout}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey={(rowData) => rowData?.id}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => onClickRow(record, rowIndex, e),
          };
        }}
        scroll={{
          x: maxWidth,
        }}
        onChange={onChangeTable}
      />
    </>
  );
}

ComTable.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  rowSelection: PropTypes.object,
  className: PropTypes.string,
  maxWidth: PropTypes.number,
  placeholderSearch: PropTypes.string,
  iconAdd: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  propsBtnAdd: PropTypes.object,
  columns: PropTypes.array,
  data: PropTypes.array,
  tableLayout: PropTypes.oneOf(["auto", "fixed"]),
  pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onAddTable: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  onSearch: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onClickRow: PropTypes.func,
  onChangeTable: PropTypes.func,
  groupsBtn: PropTypes.func,
};

export default ComTable;
