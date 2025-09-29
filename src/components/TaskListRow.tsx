import {
  ActionIcon,
  Badge,
  Card,
  Checkbox,
  Group,
  Stack,
  Text,
} from '@mantine/core'
import { Link } from '@tanstack/react-router'
import type { Doc } from '../../convex/_generated/dataModel'
import { api } from '../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { formatRelativeTime } from '../utils/dateUtils'

type TaskListRowProps = {
  task: Doc<'tasks'>
}

export function TaskListRow({ task }: TaskListRowProps) {
  const toggleTask = useMutation(api.tasks.toggle)
  const removeTask = useMutation(api.tasks.remove)

  return (
    <Card key={task._id} withBorder p="md">
      <Group justify="space-between" align="flex-start">
        <Group align="flex-start" gap="sm" style={{ flex: 1 }}>
          <Checkbox
            checked={task.isCompleted}
            onChange={() => toggleTask({ id: task._id })}
            mt={2}
          />
          <Stack gap={4} style={{ flex: 1 }}>
            <Text
              size="md"
              td={task.isCompleted ? 'line-through' : 'none'}
              c={task.isCompleted ? 'dimmed' : undefined}
            >
              {task.text}
            </Text>
            <Group gap="xs">
              <Badge
                variant="light"
                color={task.isCompleted ? 'green' : 'blue'}
                size="sm"
              >
                {task.isCompleted ? 'Completed' : 'Pending'}
              </Badge>
              <Text size="xs" c="dimmed">
                Created {formatRelativeTime(task._creationTime)}
              </Text>
            </Group>
          </Stack>
        </Group>

        <Group gap="xs">
          <ActionIcon
            component={Link}
            to={`/tasks/${task._id}/edit`}
            variant="subtle"
            color="blue"
            title="Edit task"
          >
            ✏️
          </ActionIcon>
          <ActionIcon
            onClick={() => removeTask({ id: task._id })}
            variant="subtle"
            color="red"
            title="Delete task"
          >
            🗑️
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  )
}
