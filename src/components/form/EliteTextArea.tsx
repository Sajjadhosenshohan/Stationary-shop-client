import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  defaultValue?: any;
};

const EliteTextArea = ({
  name,
  label,
  placeholder = "Enter text...",
  minRows = 3,
  maxRows = 5,
  defaultValue
}: TInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item
            label={label}
            validateStatus={errors[name] ? "error" : ""}
            
          >
            <TextArea
              {...field}
              placeholder={placeholder}
              defaultValue={defaultValue}
              autoSize={{ minRows, maxRows }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default EliteTextArea;
