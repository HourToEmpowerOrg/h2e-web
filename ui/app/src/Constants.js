export const subjectOptions = [
    { value: 'math', label: 'Math' },
    { value: 'science', label: 'Science' },
    { value: 'social_studies', label: 'Social Studies' },
    { value: 'college_applications', label: 'College Applications' },
  ]
  
export const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      padding: 10,
    }),
    control: (provided, state) => ({
      ...provided,
      padding: 10,
      fontSize: 16,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#E7ECF2',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: 'rgb(163, 174, 186)'
    })
  }

  export const feedbackOptions = [
    { value: 'HELP', label: 'Get help' },
    { value: 'FEEDBACK', label: 'General feedback' },
    { value: 'ISSUE', label: 'Report an issue' },
  ]