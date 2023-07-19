import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import heic2any from "heic2any";
import FileSaver from "file-saver";

export const useConverter = () => {
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null
  >();
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ProgressEvent<FileReader> | string>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleError = (e: ProgressEvent<FileReader>) => {
    setError(e);
    setLoading(false);
  };

  const getBase64 = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
        setFileName(file.name.split(".")[0]);
      };
      reader.onerror = function (error) {
        return handleError(error);
      };
    }
  };

  useEffect(() => {
    if (fileName.length) {
      setError("");
    }
  }, [fileName]);

  const handleReset = () => {
    setLoading(false);
    setError(undefined);
    setSelectedFile(null);
    setFileName("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(undefined);

    if (fileName.length) {
      fetch(selectedFile as RequestInfo)
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          return heic2any({ blob, toType: "image/jpeg" });
        })
        .then((result) => {
          handleReset();

          return FileSaver.saveAs(result as Blob, `${fileName}.jpg`);
        })
        .catch((e: ProgressEvent<FileReader>) => {
          return handleError(e);
        });
    } else {
      setLoading(false);
    }
  };

  return {
    fileName,
    loading,
    error,
    setError,
    inputRef,
    getBase64,
    handleReset,
    handleOnSubmit,
  };
};
