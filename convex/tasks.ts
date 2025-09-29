import { internalMutation, mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').order('desc').take(50)
  },
})

export const getById = query({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const create = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert('tasks', {
      text: args.text,
      isCompleted: false,
    })
    return taskId
  },
})

export const update = mutation({
  args: {
    id: v.id('tasks'),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text,
    })
  },
})

export const remove = mutation({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

export const toggle = mutation({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id)
    if (!task) {
      throw new Error(`Task with id '${args.id}' could not be found`)
    }

    await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    })
  },
})

const defaultTasks = [
  "Watch mike's latest video",
  'Like and subscribe',
  'Drink tea',
]

export const resetTasks = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const tasks = await ctx.db.query('tasks').take(1000)
    for (const task of tasks) await ctx.db.delete(task._id)

    for (const text of defaultTasks)
      await ctx.db.insert('tasks', { text, isCompleted: false })

    return null
  },
})
