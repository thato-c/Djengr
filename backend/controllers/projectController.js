const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')
const Project = require('../models/projectModel')
const User = require('../models/userModel')
 

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getProjects = asyncHandler(async(req, res) => {
    const projects = await Project.find({ user: req.user.id })

    res.status(200).json(projects)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setProject = asyncHandler(async(req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a textfield.')
    }

    const project = await Project.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(project)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateProject = asyncHandler(async(req, res) => {
    const project = await Project.findById(req.params.id)

    if(!project) {
        throw new Error('Project not found')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user.
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedProject)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteProject = asyncHandler(async(req, res) => {
    const project = await Project.findById(req.params.id)

    if (!project){
        res.status(400)
        throw new Error('Project not found')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user.
    if(project.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await project.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getProjects,
    setProject,
    updateProject,
    deleteProject
}