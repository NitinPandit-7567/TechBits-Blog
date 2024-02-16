import Chip from "@mui/material/Chip";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LabelIcon from "@mui/icons-material/Label";
export default function Tags({ tags }) {
  return (
    <div className="tag">
      {tags.length > 0 &&
        tags.map((el, i) => {
          return (
            <Chip
              key={i}
              label={el}
              color="secondary"
              sx={{ marginRight: "10px" }}
              icon={<LocalOfferIcon fontSize="smaller" />}
            />
          );
        })}
    </div>
  );
}
