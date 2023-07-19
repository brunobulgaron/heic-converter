import { FileInput, Trash2 } from "lucide-react";
import { useConverter } from "../../hooks/useConverter";

export function ConverterForm() {
  const {
    handleOnSubmit,
    inputRef,
    getBase64,
    loading,
    fileName,
    handleReset,
  } = useConverter();

  return (
    <form
      onSubmit={(e) => handleOnSubmit(e)}
      method="post"
      className="flex flex-col px-8 py-16"
    >
      <input
        ref={inputRef}
        onChange={(e) => getBase64(e)}
        disabled={loading}
        name="file"
        type="file"
        accept=".heic"
        className="text-sm text-zinc-400 rounded border border-zinc-800
            file:mr-5 file:py-2 file:px-6
            file:rounded file:border-0
            file:text-sm file:font-medium
            file:bg-zinc-800 file:text-zinc-500
            hover:cursor-pointer hover:file:bg-zinc-700
            hover:file:text-zinc-400"
      />

      {fileName !== "" && (
        <button
          type="button"
          className="flex justify-center items-center my-4 py-2 gap-2 text-red-500 outline outline-1 outline-red-900 rounded-sm hover:bg-red-900 hover:text-red-100 hover:outline hover:outline-1 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-600 disabled:outline-none disabled:text-zinc-100"
          onClick={() => handleReset()}
          disabled={loading}
        >
          <Trash2 size={16} strokeWidth={1.5} />
          <p>Remove</p>
        </button>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-green-700 text-zinc-200 text-md rounded disabled:bg-gray-600 disabled:cursor-not-allowed flex justify-center gap-2 items-center mt-8 hover:bg-green-600"
        disabled={loading || fileName === ""}
      >
        <FileInput size={16} strokeWidth={1.5} />
        {loading ? "Converting, please wait" : "Convert file"}
      </button>
    </form>
  );
}
