import {
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Radio,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Component for rendering a radio button with animation.
 *
 * @param {string} props.id - The ID of the radio element.
 * @param {string} props.value - The value of the radio element.
 * @param {string} props.label - The label of the radio element.
 * @returns {JSX.Element} The rendered radio element.
 */
function RadioElement({ id, value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <FormControlLabel value={value} control={<Radio />} label={label} />
    </motion.div>
  );
}

/**
 * Component for rendering a group of radio buttons with a title.
 *
 * @param {Array<{id: string, value: string, label: string}>} props.options - The options to display as radio buttons.
 * @param {string} props.title - The title of the radio group.
 * @param {Function} props.onChange - The function to call when the selected option changes.
 * @param {string} props.defaultValue - The default selected value of the radio group.
 * @returns {JSX.Element} The rendered BooleanOption component.
 */
function BooleanOption({ options, title, onChange, defaultValue }) {
  // To make sure options is always an array
  const [_options, _setOptions] = useState([]);

  useEffect(() => {
    if (Array.isArray(options)) {
      _setOptions(options);
    } else {
      _setOptions([]);
    }
  }, [options]);

  return (
    <FormControl component="fieldset">
      <FormLabel
        id="demo-radio-buttons-group-label"
        style={{ fontWeight: "600" }}
      >
        {title}
      </FormLabel>

      <RadioGroup
        name="booleanOption"
        sx={{ marginInlineStart: 2 }}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {_options.map(({ id, value, label }) => (
          <RadioElement key={id} id={id} value={value} label={label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default BooleanOption;
