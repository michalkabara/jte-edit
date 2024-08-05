import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FieldType, FieldValue } from "../types";

export const Field: React.FC<{ field: FieldType; fieldValue: FieldValue }> = ({ field, fieldValue }) => {
  if (field.type === 17 || field.type === 7 || field.type === 16) {
    const parser = new DOMParser();
    const parsedLabel = parser.parseFromString(field.label, "text/html");
    const labelMarkup = parsedLabel.querySelector("body")?.innerText;

    return (
      <FormControlLabel
        key={field.id}
        disabled
        control={<Checkbox checked={fieldValue.fieldValue !== "off"} />}
        label={labelMarkup}
      />
    );
  } else if (field.type === 18 || field.type === 19) {
    return (
      <FormControl fullWidth key={field.id}>
        <InputLabel>{field.label}</InputLabel>
        <Select labelId={field.label} value={fieldValue.fieldValue} label={field.label}>
          {field.options.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return (
    <TextField
      key={field.id}
      defaultValue={fieldValue?.fieldValue}
      name={field.name}
      variant="outlined"
      fullWidth
      label={field.label}
    />
  );
};
