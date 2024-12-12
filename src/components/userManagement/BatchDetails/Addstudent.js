// import { Button, Collapse, TextField, Grid } from "@mui/material";
// import { useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { insertStdunet } from "../../../store/slice/excelStudents.slice";

// function generateShortId() {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let shortId = "";
//   for (let i = 0; i < 3; i++) {
//     shortId += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return shortId;
// }

// function AddStudent({ showAddStudent, setShowAddStudent, batchId }) {
//   const dispatch = useDispatch();
//   const firstNameRef = useRef();
//   const lastNameRef = useRef();
//   const emailRef = useRef();
//   const phoneNumberRef = useRef();
//   console.log(batchId);

//   const [isFirstNameValid, setIsFirstNameValid] = useState();
//   const [isLastNameValid, setIsLastNameValid] = useState();
//   const [isEmailValid, setIsEmailValid] = useState();
//   const [isPhoneNumberValid, setIsPhoneNumberValid] = useState();

//   const handleSubmit = () => {
//     const firstName = firstNameRef.current.value;
//     const lastName = lastNameRef.current.value;
//     const email = emailRef.current.value;
//     const phoneNumber = phoneNumberRef.current.value;
//     // const studentId = (Math.random() * 1000).toFixed() + "add";

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     if (!firstName || !email || !emailRegex.test(email)) {
//       if (!firstName) setIsFirstNameValid(false);
//       if (!lastName) setIsLastNameValid(false);
//       if (!email || !emailRegex.test(email)) setIsEmailValid(false);
//       if (!phoneNumber) setIsPhoneNumberValid(false);

//       return;
//     }

//     firstNameRef.current.value = "";
//     lastNameRef.current.value = "";
//     emailRef.current.value = "";
//     phoneNumberRef.current.value = "";

//     dispatch(
//       insertStdunet({
//         BatchId: batchId,
//         FirstName: firstName,
//         LastName: lastName,
//         Email: email,
//         PhoneNumber: phoneNumber,
//       })
//     );
//   };

//   const handleInputChange = (e, setter) => {
//     if (!setter) return;
//     if (e.target.value?.length > 0) {
//       setter(true);
//     } else {
//       setter(false);
//     }
//   };

//   return (
//     <Collapse in={showAddStudent}>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             label="First Name *"
//             variant="outlined"
//             inputRef={firstNameRef}
//             onChange={(e) => handleInputChange(e, setIsFirstNameValid)}
//             error={!isFirstNameValid && isFirstNameValid !== undefined}
//             autoComplete="off"
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             label="Last Name"
//             variant="outlined"
//             inputRef={lastNameRef}
//             onChange={(e) => handleInputChange(e, setIsLastNameValid)}
//             error={!isLastNameValid && isLastNameValid !== undefined}
//             autoComplete="off"
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             label="Email *"
//             variant="outlined"
//             type="email"
//             inputRef={emailRef}
//             onChange={(e) => handleInputChange(e, setIsEmailValid)}
//             error={!isEmailValid && isEmailValid !== undefined}
//             inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" }}
//             autoComplete="off"
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             fullWidth
//             label="Phone Number"
//             variant="outlined"
//             type="number"
//             inputRef={phoneNumberRef}
//             onChange={(e) => handleInputChange(e, setIsPhoneNumberValid)}
//             error={!isPhoneNumberValid && isPhoneNumberValid !== undefined}
//             inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
//             autoComplete="off"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Add
//           </Button>
//         </Grid>
//       </Grid>
//     </Collapse>
//   );
// }

// export default AddStudent;


import { Button, Collapse, TextField, Grid } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { insertStdunet } from "../../../store/slice/excelStudents.slice";

function generateShortId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";
  for (let i = 0; i < 3; i++) {
    shortId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortId;
}

function AddStudent({ showAddStudent, setShowAddStudent }) {
  const dispatch = useDispatch();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();

  const [isFirstNameValid, setIsFirstNameValid] = useState();
  const [isLastNameValid, setIsLastNameValid] = useState();
  const [isEmailValid, setIsEmailValid] = useState();
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState();

  const handleSubmit = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const studentId = (Math.random() * 1000).toFixed() + "add";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!firstName || !email || !emailRegex.test(email)) {
      if (!firstName) setIsFirstNameValid(false);
      if (!lastName) setIsLastNameValid(false);
      if (!email || !emailRegex.test(email)) setIsEmailValid(false);
      if (!phoneNumber) setIsPhoneNumberValid(false);

      return;
    }

    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    phoneNumberRef.current.value = "";

    dispatch(
      insertStdunet({
        StudentID: studentId,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        PhoneNumber: phoneNumber,
      })
    );
  };

  const handleInputChange = (e, setter) => {
    if (!setter) return;
    if (e.target.value?.length > 0) {
      setter(true);
    } else {
      setter(false);
    }
  };

  return (
    <Collapse in={showAddStudent}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="First Name *"
            variant="outlined"
            inputRef={firstNameRef}
            onChange={(e) => handleInputChange(e, setIsFirstNameValid)}
            error={!isFirstNameValid && isFirstNameValid !== undefined}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            inputRef={lastNameRef}
            onChange={(e) => handleInputChange(e, setIsLastNameValid)}
            error={!isLastNameValid && isLastNameValid !== undefined}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Email *"
            variant="outlined"
            type="email"
            inputRef={emailRef}
            onChange={(e) => handleInputChange(e, setIsEmailValid)}
            error={!isEmailValid && isEmailValid !== undefined}
            inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            type="number"
            inputRef={phoneNumberRef}
            onChange={(e) => handleInputChange(e, setIsPhoneNumberValid)}
            error={!isPhoneNumberValid && isPhoneNumberValid !== undefined}
            inputProps={{ pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </Grid>
      </Grid>
    </Collapse>
  );
}

export default AddStudent;

