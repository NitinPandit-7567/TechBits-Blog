import Editor from "../Components/Editor";
import { TextField, LinearProgress, Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import TagEditor from "../Components/TagEditor";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PostSubmitter from "../Components/PostSubmiter";
import { styled } from "@mui/material/styles";
import "../styles/postEditor.css";
export default function PostEditor({
  helperText,
  handleSubmit,
  imageHandler,
  props,
}) {
  const {
    isLoggedIn,
    setError,
    title,
    setTitle,
    summary,
    setSummary,
    content,
    setContent,
    tags,
    setTags,
    setStatus,
    isSubmitLoading,
    image,
    uploadedFileURL,
  } = props;
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  if (!isLoggedIn) {
    setError({ status: 401, message: "Not Authenticated" });
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="editWrapper">
      {isSubmitLoading && <LinearProgress />}
      <h1>{helperText}</h1>
      <form onSubmit={handleSubmit}>
        <div className="editor-cover">
          <img
            src={
              Object.keys(uploadedFileURL).length > 0
                ? uploadedFileURL
                : image.image !== undefined
                ? image.image
                : "../../blog-cover-picture.png"
            }
            alt="Cover Image"
            className="editor-image"
          ></img>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={imageHandler}
            id="image"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
          >
            Upload Image
            <VisuallyHiddenInput type="file" name="image" />
          </Button>
        </div>
        <div className="editor-fields">
          <h3>Title:</h3>
          <TextField
            className="editor-title"
            id="title"
            label="Title"
            value={title}
            required
            onChange={(ev) => setTitle(ev.target.value)}
            fullWidth
            name="title"
          />
          <br></br>
          <br></br>
          <h3 className="editor-summary">Summary</h3>
          <TextField
            id="summary"
            name="summary"
            label="Summary"
            required
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <br></br>
          <br></br>
          <h3 className="editor-content">Content</h3>
          <Editor value={content} onChange={setContent} name="content" />
          <br></br>
          <TagEditor
            tags={tags}
            setTags={setTags}
            name="tags"
            className="editor-tags"
          />
          <br></br>
          <PostSubmitter setStatus={setStatus} />
        </div>
      </form>
    </div>
  );
}
