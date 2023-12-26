import React from "react";
import { Button, Card, Radio, Space } from "antd";
import { t } from "i18next";
import PropTypes from "prop-types";

function FilterDropdown({
  field,
  items,
  onSetPagination,
  close,
  confirm,
  selectedKeys,
  setSelectedKeys,
  clearFilters,
}) {
  const handleOk = () => {
    onSetPagination((curState) => ({
      ...curState,
      [field]: selectedKeys,
    }));
    confirm();
    close();
  };

  const resetFilter = () => {
    onSetPagination((curState) => ({
      ...curState,
      [field]: null,
    }));
    clearFilters();
    close();
  };

  return (
    <Card
      className="card-dropdown"
      actions={[
        <Button
          type="text"
          className="full-width"
          onClick={resetFilter}
          disabled={!selectedKeys[0]}
        >
          {t("events.list.btnReset")}
        </Button>,
        <Button type="text" className="full-width" onClick={handleOk}>
          Ok
        </Button>,
      ]}
    >
      <Radio.Group
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        value={selectedKeys[0]}
      >
        <Space direction="vertical">
          {items.map((type) => (
            <Radio value={type.value} key={type.key}>
              {type.label}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  );
}

FilterDropdown.propTypes = {
  field: PropTypes.string,
  items: PropTypes.array,
  onSetPagination: PropTypes.func,
  close: PropTypes.func,
  confirm: PropTypes.func,
  setSelectedKeys: PropTypes.func,
  selectedKeys: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  clearFilters: PropTypes.func,
};

export default FilterDropdown;
