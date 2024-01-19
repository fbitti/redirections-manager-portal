import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Container } from '@mui/material';

function RuleForm() {
  const [newRule, setNewRule] = useState({
    source: '',
    destination: '',
    regex: false
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setNewRule({ ...newRule, [name]: name === 'regex' ? checked : value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://redirections-manager.edgecompute.app/redirections', newRule)
    .then(response => {
      console.log('Rule created:', response.data);
      setNewRule({ source: '', destination: '', regex: false }); // Reset form
    })
    .catch(error => {
      console.error('Error creating rule:', error);
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Create New Redirection Rule
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControlLabel
          control={<Checkbox name="regex" checked={newRule.regex} onChange={handleChange} />}
          label="Regex"
        />
        <TextField
          label="Source"
          name="source"
          value={newRule.source}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Destination"
          name="destination"
          value={newRule.destination}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Rule
        </Button>
      </form>
    </Container>
  );
}

export default RuleForm;
