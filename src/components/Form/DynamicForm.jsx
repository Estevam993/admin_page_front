"use client";
import {useState, useEffect} from "react";

import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Autocomplete,
} from "@mui/material";

import {IconEye, IconEyeOff} from "@tabler/icons-react";

export default function DynamicForm({inputs, buttons}) {
  const [showPassword, setShowPassword] = useState({});

  const [formValues, setFormValues] = useState({}
  );

  const handleInputChange = (name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTogglePassword = (inputName) => {
    setShowPassword((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

  useEffect(() => {
    setFormValues((prevValues) => {
      const values = inputs.reduce((acc, field) => {
        if (field.type === "options" && Array.isArray(field.options)) {
          acc[field.name] = prevValues[field.name] ||
            field.options.find((option) => option.id === field.value) || null;
        } else {
          acc[field.name] = prevValues[field.name] || field.value || "";
        }
        return acc;
      }, {});
      return values;
    });
  }, [inputs]);

  return (
    <Stack>
      {inputs?.map((input, index) => {
        switch (input.type) {
          case "options":
            return (
              <Autocomplete
                key={index}
                margin="normal"
                required={input.required}
                fullWidth
                options={input?.options ?? [""]}
                value={formValues[input.name] || null}
                onChange={(event, newValue) => {
                  handleInputChange(input.name, newValue);
                }}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => (option && option.label) || ""}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    required={input.required}
                    fullWidth
                    label={input.label}
                    name={input.name}
                    variant="filled"
                  />
                )}
              />
            );

          default:
            return (
              <TextField
                key={index}
                type={
                  input.type === "password"
                    ? showPassword[input.name]
                      ? "text"
                      : "password"
                    : input.type
                }
                name={input.name}
                label={input.label}
                required={input.required}
                value={formValues[input.name] || ""}
                fullWidth
                margin="normal"
                variant="filled"
                color="black"
                InputProps={
                  input.type === "password"
                    ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handleTogglePassword(input.name)}
                            edge="end"
                          >
                            {showPassword[input.name] ? (
                              <IconEyeOff/>
                            ) : (
                              <IconEye/>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }
                    : undefined
                }
                onChange={(e) => handleInputChange(input.name, e.target.value)}
              />
            );
        }
      }) || ""}
      <Stack direction={"row"} justifyContent={"space-evenly"} sx={{mt: 2}}>
        {buttons?.map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            color={button.color}
            onClick={() => button.onClick(formValues)}
            sx={{margin: "8px"}}
            // loading={!!button?.loading}
          >
            {button.label}
          </Button>
        )) || ""}
      </Stack>
    </Stack>
  );
}
