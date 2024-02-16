import { Button, ButtonGroup } from "@mui/material";
export default function PostSubmitter({ setStatus }) {
  return (
    <div className="postSubmitter">
      <ButtonGroup
        variant="outlined"
        aria-label="Basic button group"
        size="small"
      >
        <Button
          color="success"
          id="published"
          type="submit"
          onClick={() => {
            setStatus("published");
          }}
        >
          Publish
        </Button>
        <Button
          color="warning"
          id="draft"
          type="submit"
          onClick={() => {
            setStatus("draft");
          }}
        >
          Save as draft
        </Button>
      </ButtonGroup>
    </div>
  );
}
