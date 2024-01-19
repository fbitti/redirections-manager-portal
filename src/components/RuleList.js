import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, 
        TableBody, 
        TableCell, 
        TableContainer, 
        TableHead, 
        TableRow, 
        Paper, 
        Checkbox, 
        TextField } 
from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function RuleList() {
  const [rules, setRules] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRule, setEditedRule] = useState({});

  const handleEdit = (index, rule) => {
    setEditingIndex(index);
    setEditedRule({ ...rule });
  };
  
  const handleCancel = () => {
    setEditingIndex(null);
    setEditedRule({});
  };
  
  const handleSave = () => {
    // Update the rule in the state and backend
    const updatedRules = [...rules];
    updatedRules[editingIndex] = editedRule;
    setRules(updatedRules);
  
    // Save changes to the backend
    axios.put(`https://redirections-manager.edgecompute.app/redirections/${editingIndex}`, editedRule)
    .then(response => {
      console.log('Rule updated:', response.data);
    })
    .catch(error => {
      console.error('There was an error updating the rule!', error);
    });
  
    setEditingIndex(null);
    setEditedRule({});
  };
  
  const handleChange = (e, field) => {
    setEditedRule({ ...editedRule, [field]: field === 'regex' ? e.target.checked : e.target.value });
  };  

  useEffect(() => {
    axios.get('https://redirections-manager.edgecompute.app/redirections')
    .then(response => {
      setRules(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching the rules!', error);
    });
  }, []);

  const moveRule = (currentIndex, newIndex) => {
    if (newIndex < 0 || newIndex >= rules.length) return;

    const newRules = Array.from(rules);
    const [movedRule] = newRules.splice(currentIndex, 1);
    newRules.splice(newIndex, 0, movedRule);

    setRules(newRules);

    // Call API to update order on the server
    axios.put('https://redirections-manager.edgecompute.app/reorder-redirections', {
      currentIndex: currentIndex,
      newPosition: newIndex
    }).catch(error => {
      console.error('Error reordering rules:', error);
      // Optionally, handle reordering failure (e.g., fetch the list again)
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Regex?</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rules.map((rule, index) => (
            <TableRow key={index} hover>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <TextField 
                    value={editedRule.source}
                    onChange={(e) => handleChange(e, 'source')}
                    size="small"
                    style={{ fontFamily: 'Courier New, monospace' }}
                  />
                ) : (
                  <span style={{ fontFamily: 'Courier New, monospace' }}>{rule.source}</span>
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <TextField 
                    value={editedRule.destination}
                    onChange={(e) => handleChange(e, 'destination')}
                    size="small"
                    style={{ fontFamily: 'Courier New, monospace' }}
                  />
                ) : (
                  <span style={{ fontFamily: 'Courier New, monospace' }}>{rule.destination}</span>
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Checkbox
                    checked={editedRule.regex}
                    onChange={(e) => handleChange(e, 'regex')}
                  />
                ) : (
                  <Checkbox checked={rule.regex} disabled />
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <>
                    <IconButton onClick={handleSave} aria-label="save">
                      <SaveIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={handleCancel} aria-label="cancel">
                      <CancelIcon color="secondary" />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEdit(index, rule)} aria-label="edit">
                    <EditIcon sx={{ color: 'blue' }} />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => moveRule(index, index - 1)}
                  style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                >
                  <ArrowUpwardIcon sx={{ color: 'blue' }} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => moveRule(index, index + 1)}
                  style={{ visibility: index === rules.length - 1 ? 'hidden' : 'visible' }}
                >
                  <ArrowDownwardIcon sx={{ color: 'blue' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RuleList;
