import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function TechnologySelector({
  options = [],
  selectedTechnologies,
  setSelectedTechnologies,
  error,
  setErrors,
}) {
  const handleChange = (event, newValue) => {
    setSelectedTechnologies(newValue);

    // Clear error if any technology is selected
    if (newValue.length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, technologies: undefined }));
    }
  };

  return (
    <div style={{width:"450px"}}>
      <Autocomplete
        multiple
        options={options}
        value={selectedTechnologies}
        onChange={handleChange}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select A Technology"
            placeholder="Select Technologies"
            error={!!error}
            helperText={error}
          />
        )}
      />
    </div>
  );
}

export default TechnologySelector;
