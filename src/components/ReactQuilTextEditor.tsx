"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
type onChangeType = {
  onChange: (value: string) => void;
  defaultValue?: string;
};
export default function ReactQuillTextEditor({
  onChange,
  defaultValue = "",
}: onChangeType) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        defaultValue={defaultValue}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
}
