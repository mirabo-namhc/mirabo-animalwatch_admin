import React from "react";
import { TYPE_FIELD } from "@common/constant/form";
import { MyComponents } from "@components/form";
import MyFormList from "@components/form/MyFormList";
import MyEditor from "@components/layout/Editor";
import FormDetail from "@components/form/FormDetail";

export const renderFieldForm = (dataFormArr) => {
  const listFiled = dataFormArr.map((item) => {
    switch (item.type) {
      case TYPE_FIELD.INPUT: {
        return (
          <MyComponents.TextField
            key={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            value={item.value ? item.value : ""}
            colwidth={item.colwidth}
            isInputNumber={item.isNumber}
            disabled={item.disabled}
            hideField={item.hideField}
            subnote={item.subNote}
            rules={item.rules}
            max={item.max}
            min={item.min}
            precision={item.precision}
            onKeyPress={item.onKeyPress}
            {...item}
          />
        );
      }

      case TYPE_FIELD.SELECT: {
        return (
          <MyComponents.Select
            mode={item.mode}
            key={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            colwidth={item.colwidth}
            value={item.value}
            disabled={item.disabled}
            defaultValue={item.defaultValue}
            subnote={item.subNote}
            hideField={item.hideField}
            filterOption={item.filterOption}
            className={item.className}
            {...item}
          />
        );
      }

      case TYPE_FIELD.SELECT_SCROLL_LOADING: {
        return (
          <MyComponents.SelectScrollLoading
            key={item.name}
            name={item.name}
            label={item.label}
            rules={item.rules}
            mode={item.mode}
            fetchData={item.fetchData}
            hideField={item.hideField}
            listDeletedId={item.listDeletedId}
            listInitialId={item.listInitialId}
            setListDeletedId={item.setListDeletedId}
            {...item}
          />
        );
      }

      case TYPE_FIELD.TEXT_AREA: {
        return (
          <MyComponents.TextArea
            key={item.name}
            name={item.name}
            label={item.label}
            placeholder={item.placeholder}
            colwidth={item.colwidth}
            disabled={item.disabled}
            hideField={item.hideField}
            {...item}
          />
        );
      }

      case TYPE_FIELD.DATE_PICKER: {
        return (
          <MyComponents.DatePicker
            key={item.name}
            label={item.label}
            name={item.name}
            colwidth={item.colwidth}
            rules={item.rules}
            // disabledDate={(e) => item.disabledDate(e)}
            showTime={item.showTime}
            {...item}
          />
        );
      }

      case TYPE_FIELD.RANGE_DATE: {
        return (
          <MyComponents.RangeDatePicker
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
            showTime={item.showTime}
            {...item}
          />
        );
      }

      case TYPE_FIELD.UPLOAD: {
        return (
          <MyComponents.Upload
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
            initialFileList={item.initialFileList}
            deletedArr={item.deletedArr}
            setDeletedArr={item.setDeletedArr}
            disabled={item.disabled}
            setAddedArr={item.setAddedArr}
            fileName="roomNumberFile"
            length={item.length}
          />
        );
      }

      case TYPE_FIELD.UPLOAD_FIELD: {
        return (
          <MyComponents.UploadFile
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
            disabled={item.disabled}
            maxFile={item.maxFile}
            {...item}
          />
        );
      }

      case TYPE_FIELD.COLOR_PICKER: {
        return (
          <MyComponents.ColorPicker
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
            {...item}
          />
        );
      }

      case TYPE_FIELD.CHECKBOX: {
        return (
          <MyComponents.Checkbox
            key={item.name}
            label={item.label}
            name={item.name}
            checked={item.checked}
            setData={item.setData}
            {...item}
          />
        );
      }

      case TYPE_FIELD.DEBOUNCE_SELECT:
        return (
          <MyComponents.DebounceSelect key={item.name} label={item.label} />
        );

      case TYPE_FIELD.FORM_LIST: {
        return <MyFormList key={item.name} />;
      }
      case TYPE_FIELD.FORM_DETAIL: {
        return <FormDetail key={item.name} {...item} />;
      }
      case TYPE_FIELD.TEXT_EDITOR:
        return <MyEditor key={item.name} {...item} />;

      default:
        return null;
    }
  });
  return listFiled;
};
