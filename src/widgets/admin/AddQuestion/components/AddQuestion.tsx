"use client";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

interface UploadProps {
  placeholder?: string;
}

interface QuestionData {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  correct: string;
}

export default function Upload({ placeholder }: UploadProps): JSX.Element {
  const editorRefs = {
    question: useRef(null),
    a: useRef(null),
    b: useRef(null),
    c: useRef(null),
    d: useRef(null),
    e: useRef(null),
    correct: useRef(null),
  };

  const [data, setData] = useState<QuestionData>({
    question: "",
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    correct: "",
  });

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  const handleEditorChange = (name: keyof QuestionData, newContent: string) => {
    setData((prevData) => ({ ...prevData, [name]: newContent }));
  };

  console.log(data);

  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto px-4 py-6">
        <div className="space-y-6">
          {[
            { label: "Question", key: "question" },
            { label: "Option A", key: "a" },
            { label: "Option B", key: "b" },
            { label: "Option C", key: "c" },
            { label: "Option D", key: "d" },
            { label: "Option E", key: "e" },
            { label: "Correct Answer", key: "correct" },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-2">
              <label className="block font-medium text-gray-700">{label}</label>
              <JoditEditor
                ref={editorRefs[key as keyof QuestionData]}
                value={data[key as keyof QuestionData]}
                config={config}
                tabIndex={1}
                onChange={(newContent) =>
                  handleEditorChange(key as keyof QuestionData, newContent)
                }
                className="border border-gray-300 rounded-md shadow-sm"
              />
              {/* Displaying the content of the field */}
              <div className="flex flex-row items-center">
                <span className="">Content :</span>
                <div
                className="text-sm text-gray-800"
                dangerouslySetInnerHTML={{
                  __html: data[key as keyof QuestionData],
                }}
              />
              </div>
            </div>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
}
