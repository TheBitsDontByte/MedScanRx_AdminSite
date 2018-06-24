export const validateAddEditFields = values => {
  const errors = {};

  if (!values.firstName) errors.firstName = "First Name is required";
  if (values.firstName && values.firstName.length > 50)
    errors.firstName = "First Name must be less than 50 characters";

  if (!values.lastName) errors.lastName = "Last Name is required";
  if (values.lastName && values.lastName.length > 50)
    errors.lastName = "Last Name must be less than 50 characters";

  if (!values.dateOfBirth) errors.dateOfBirth = "Date of birth is required";

  if (!values.gender) errors.gender = "Please select a gender";

  if (!values.email) errors.email = "Email is required";
  if (
    values.email &&
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  )
    errors.email = "Email address is in an invalid format";

  if (!values.phone1) errors.phone1 = "Primary Phone Number is required";
  if (
    values.phone1 &&
    !(values.phone1.length == 8 || values.phone1.length == 12)
  )
    errors.phone1 = "Primary Phone Number must be 7 or 10 numeric characters";

  if (
    values.phone2 &&
    !(values.phone2.length == 8 || values.phone2.length == 12)
  )
    errors.phone2 = "Secondary Phone Number must be 7 or 10 numeric characters";

  if (values.preferredPhysician && values.preferredPhysician.length > 100)
    errors.preferredPhysician =
      "Preferred Physician must be less then 100 characters";

  if (values.preferredHospital && values.preferredHospital.length > 50)
    errors.preferredHospital =
      "Preferred Hospital must be less then 50 characters";

  if (values.emergencyContactName && values.emergencyContactName.length > 100)
    errors.emergencyContactName =
      "Emergency Contact Name must be less than 100 characters";

  if (
    values.emergencyContactRelation &&
    values.emergencyContactRelation.length > 25
  )
    errors.emergencyContactRelation =
      "Emergency Contact Relation must be less than 25 characters";

  if (
    values.emergencyContactPhone &&
    !(
      values.emergencyContactPhone.length == 8 ||
      values.emergencyContactPhone.length == 12
    )
  )
    errors.emergencyContactPhone =
      "Emergency Contact Phone must be 10 numeric characters";

  return errors;
};

const maxLength = max => value =>
  value && value.length > max
    ? "Patient ID must be less than 8 characters"
    : undefined;

export const maxLength8 = maxLength(8);

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
