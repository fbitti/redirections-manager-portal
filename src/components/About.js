import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

function About() {
  return (
    <Container maxWidth="md">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4" gutterBottom>
          About Redirections Manager
        </Typography>

        <Typography variant="h6" gutterBottom>
          What is Redirections Manager?
        </Typography>
        <Typography paragraph>
          Redirections Manager is a web-based portal designed to simplify the management of URL redirection rules. It allows administrators to create, edit, delete, and reorder redirection rules easily. This tool is especially useful for managing URL paths and their corresponding redirect destinations, ensuring efficient navigation within a website or application.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Typography paragraph>
          The portal operates by maintaining a list of redirection rules. Each rule specifies a source URL path and a destination URL to which the traffic should be redirected. Administrators can add new rules or modify existing ones. The portal supports both simple and regex-based URL patterns, offering flexibility in handling various redirection scenarios.
        </Typography>

        <Typography variant="h6" gutterBottom>
          How to Use It
        </Typography>
        <Typography paragraph>
          To use the portal, navigate to the list of rules to view all existing redirections. You can add a new rule using the "Create New Rule" feature, where you specify the source and destination URLs. If needed, enable the regex option for pattern-based redirection. Existing rules can be edited or deleted as required. The portal also provides a feature to test the redirections, ensuring that they work as expected before going live.
        </Typography>

        <Typography paragraph>
          The up/down arrow functionality allows for easy reordering of rules, ensuring that priority rules are evaluated first. This intuitive interface makes managing redirections straightforward and efficient.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;
