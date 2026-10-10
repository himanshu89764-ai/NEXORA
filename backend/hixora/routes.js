'use strict';
const express = require('express');
const router = express.Router();

router.get('/health', (_req, res) => res.json({
  success: true, module: 'HIXORA Action Engine', version: 1
}));

router.post('/action-plan', (req, res) => {
  const goal = String(req.body?.goal || '').trim().slice(0, 2000);
  if (!goal) return res.status(400).json({success:false,error:'Describe your goal first.'});

  const tasks = [];
  const add = (id, title, description) =>
    tasks.push({id, title, description, status:'planned'});

  if (/\b(interview|job|placement|resume|cv|नौकरी|इंटरव्यू)\b/i.test(goal)) {
    add('research', 'Research company and role', 'Identify current facts and useful sources.');
    add('questions', 'Prepare interview Q&A', 'Organize role-specific practice questions.');
    add('intro', 'Draft your introduction', 'Prepare an editable short introduction.');
    add('checklist', 'Prepare interview checklist', 'List documents and preparation tasks.');
    add('mock', 'Prepare mock interview', 'Identify the next step for interview practice.');
  } else if (/\b(trip|travel|holiday|vacation|यात्रा|घूमने)\b/i.test(goal)) {
    add('itinerary', 'Plan the itinerary', 'Organize stops and a practical schedule.');
    add('budget', 'Estimate the budget', 'List cost categories and assumptions.');
    add('checklist', 'Prepare travel checklist', 'Organize packing and travel reminders.');
  } else if (/\b(study|exam|syllabus|revision|पढ़ाई|परीक्षा)\b/i.test(goal)) {
    add('study', 'Build a study plan', 'Split the goal into manageable sessions.');
    add('revision', 'Organize revision', 'Identify topics and practice priorities.');
    add('checklist', 'Track preparation', 'Create a study progress checklist.');
  } else {
    add('breakdown', 'Break down the goal', 'Identify useful subtasks and dependencies.');
    add('research', 'Identify research needs', 'Determine which details need evidence.');
    add('deliverable', 'Plan a usable result', 'Identify a concrete output for the goal.');
  }

  res.json({
    success:true,
    engine:'HIXORA Action Fan-Out',
    goal,
    tasks,
    note:'These are planned tasks, not claims of completed execution.'
  });
});
module.exports = router;
