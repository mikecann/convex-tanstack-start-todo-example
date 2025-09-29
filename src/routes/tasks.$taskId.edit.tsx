import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import {
  Container,
  Title,
  Button,
  Card,
  TextInput,
  Group,
  Stack,
  Text,
  Alert,
  Loader,
} from '@mantine/core'
import { useState, useEffect } from 'react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { formatRelativeTime } from '../utils/dateUtils'

export const Route = createFileRoute('/tasks/$taskId/edit')({
  component: EditTask,
  loader: async (opts) => {
    await opts.context.queryClient.prefetchQuery(
      convexQuery(api.tasks.getById, { id: opts.params.taskId as Id<'tasks'> }),
    )
  },
})

function EditTask() {
  const { taskId } = Route.useParams()
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const { data: task } = useSuspenseQuery(
    convexQuery(api.tasks.getById, { id: taskId as Id<'tasks'> }),
  )

  const updateTask = useMutation(api.tasks.update)

  useEffect(() => {
    if (task) setText(task.text)
  }, [task])

  if (!task) {
    return (
      <Container size="sm" py="xl">
        <Alert color="red" title="Task Not Found">
          The task you're trying to edit could not be found.
        </Alert>
        <Button component={Link} to="/" mt="md">
          Back to Tasks
        </Button>
      </Container>
    )
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <Title order={1}>Edit Task</Title>

        <Card withBorder p="md">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!text.trim() || !task) return
              setIsSubmitting(true)
              updateTask({
                id: taskId as Id<'tasks'>,
                text: text.trim(),
              })
                .then(() => navigate({ to: '/' }))
                .catch((error) =>
                  console.error('Failed to update task:', error),
                )
                .finally(() => setIsSubmitting(false))
            }}
          >
            <Stack gap="md">
              <TextInput
                label="Task Description"
                placeholder="Enter task description..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                autoFocus
              />

              {task && (
                <Group gap="xs">
                  <Text size="xs" c="dimmed">
                    Created {formatRelativeTime(task._creationTime)}
                  </Text>
                </Group>
              )}

              <Group justify="flex-end" gap="sm">
                <Button
                  component={Link}
                  to="/"
                  variant="subtle"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!text.trim() || (task && text.trim() === task.text)}
                >
                  Update Task
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>

        <Text size="sm" c="dimmed">
          💡 Tip: The update button is disabled when no changes are made
        </Text>
      </Stack>
    </Container>
  )
}
