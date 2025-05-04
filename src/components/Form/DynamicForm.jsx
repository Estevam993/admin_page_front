"use client";
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Autocomplete,
} from "@mui/material";
import {IconEye, IconEyeOff} from "@tabler/icons-react";
import {useState} from "react";

export default function DynamicForm({inputs, buttons}) {
  const [showPassword, setShowPassword] = useState({});

  const [formValues, setFormValues] = useState(
    inputs.reduce((acc, field) => {
      acc[field.name] = field.value || "";
      return acc;
    }, {})
  );

  const handleInputChange = (label, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [label]: value,
    }));
  };

  const handleTogglePassword = (inputName) => {
    setShowPassword((prev) => ({
      ...prev,
      [inputName]: !prev[inputName],
    }));
  };

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
                onChange={(event, newValue) => {
                  const id = newValue?.id;
                  console.log(id)
                  handleInputChange(input.name, id);
                }}
                getOptionKey={(option) => option.id}
                getOptionLabel={(option) => option.label}
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
            loading={!!button?.loading}
          >
            {button.label}
          </Button>
        )) || ""}
      </Stack>
    </Stack>
  );
}
