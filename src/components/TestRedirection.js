import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

function TestRedirection() {
  const [path, setPath] = useState('');
  const [result, setResult] = useState('');

  const handleTest = (event) => {
    event.preventDefault();
    axios.get(`https://redirections-manager.edgecompute.app/test-redirect?path=${path}`)
        .then(response => {
            const data = response.data;
            const resultMessage = data.match === "yes" ? `Match: Yes, Destination: ${data.destination}` : 'Match: No';
            setResult(resultMessage);
        })
        .catch(error => {
            console.error('Error testing redirection:', error);
            setResult('Error occurred while testing the redirection.');
        });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Test Redirection
      </Typography>
      <form onSubmit={handleTest}>
        <TextField
          label="Enter Path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Test
        </Button>
      </form>
      {result && (
        <Paper style={{ padding: 16, marginTop: 16 }}>
          <Typography variant="body1">{result}</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default TestRedirection;
