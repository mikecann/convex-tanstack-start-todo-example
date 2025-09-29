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
} from '@mantine/core'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { useMutation } from 'convex/react'

export const Route = createFileRoute('/tasks/new')({
  component: NewTask,
})

function NewTask() {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const createTask = useMutation(api.tasks.create)

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <Title order={1}>Create New Task</Title>

        <Card withBorder p="md">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsSubmitting(true)
              createTask({ text: text.trim() })
                .then(() => navigate({ to: '/' }))
                .catch((error) =>
                  console.error('Failed to create task:', error),
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
                  disabled={!text.trim()}
                >
                  Create Task
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>

        <Text size="sm" c="dimmed">
          💡 Tip: Press Enter to quickly create your task
        </Text>
      </Stack>
    </Container>
  )
}
