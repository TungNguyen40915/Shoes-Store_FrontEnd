import {
Input, Form, InputNumber
} from 'antd';
import React, { Component } from 'react';
const FormItem = Form.Item;
export const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };
  isPositiveInteger = (rule, value, callback) => {
    if (value) {
      let intValue = Math.floor(Number(value));
      if (
        !(intValue !== Infinity && String(intValue) === value && intValue > 0)
      ) {
        callback("Yêu cầu nhập số nguyên dương");
      }
    }
    callback();
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Yêu cầu nhập ${title}!`,
                    },
                    {
                      validator: this.isPositiveInteger,
                      message: `Yêu cầu nhập số nguyên dương!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

export default EditableCell;