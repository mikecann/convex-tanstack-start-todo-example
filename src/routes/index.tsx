import { createFileRoute } from '@tanstack/react-router'
import { Container, Title, Card, Text, Stack, Flex, Group } from '@mantine/core'
import { api } from '../../convex/_generated/api'
import { TaskListRow } from '../components/TaskListRow'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'

export const Route = createFileRoute('/')({
  component: Home,
  loader: async (opts) => {
    await opts.context.queryClient.prefetchQuery(
      convexQuery(api.tasks.list, {}),
    )
  },
})

function Home() {
  const { data: tasks } = useSuspenseQuery(convexQuery(api.tasks.list, {}))

  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        <Flex justify="space-between" align="center">
          <Group>
            <Title order={1}>Task Manager</Title>
          </Group>
        </Flex>

        {tasks.length === 0 ? (
          <Card withBorder p="xl" ta="center">
            <Text c="dimmed" size="lg">
              No tasks yet. Create your first task to get started!
            </Text>
            <Text c="dimmed" size="sm" mt="sm">
              Use the "➕ New Task" button in the navigation above to create
              your first task.
            </Text>
          </Card>
        ) : (
          <Stack gap="sm">
            {tasks.map((task) => (
              <TaskListRow key={task._id} task={task} />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
