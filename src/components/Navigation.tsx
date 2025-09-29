import { Link, useLocation } from "@tanstack/react-router";
import {
  Container,
  Group,
  Text,
  Button,
  Breadcrumbs,
  Anchor,
  Divider,
  Box,
} from "@mantine/core";

export function Navigation() {
  const location = useLocation();

  // Create proper breadcrumbs based on actual route structure
  const getBreadcrumbs = () => {
    const pathname = location.pathname;

    // Home page (task list) - no breadcrumbs needed
    if (pathname === "/") {
      return [];
    }

    // New task page
    if (pathname === "/tasks/new") {
      return [
        <Anchor key="/" component={Link} to="/" size="sm">
          Tasks
        </Anchor>,
        <Text key="new" size="sm" c="dimmed">
          New Task
        </Text>,
      ];
    }

    // Edit task page
    if (pathname.match(/^\/tasks\/[^/]+\/edit$/)) {
      const taskId = pathname.split("/")[2];
      return [
        <Anchor key="/" component={Link} to="/" size="sm">
          Tasks
        </Anchor>,
        <Text key="edit" size="sm" c="dimmed">
          Task {taskId.slice(0, 8)}...
        </Text>,
      ];
    }

    // Fallback - just link back to tasks
    return [
      <Anchor key="/" component={Link} to="/" size="sm">
        Tasks
      </Anchor>,
    ];
  };

  const breadcrumbItems = getBreadcrumbs();
  const showBreadcrumbs = breadcrumbItems.length > 0;

  return (
    <Box bg="gray.1" py="sm">
      <Container size="md">
        <Group justify="space-between" align="center">
          <Group gap="md">
            <Button component={Link} to="/" variant="subtle" size="sm">
              🏠 Tasks
            </Button>

            {showBreadcrumbs && (
              <>
                <Divider orientation="vertical" />
                <Breadcrumbs separator="›">{breadcrumbItems}</Breadcrumbs>
              </>
            )}
          </Group>

          <Group gap="xs">
            {/* Only show New Task button on home page */}
            {location.pathname === "/" && (
              <Button
                component={Link}
                to="/tasks/new"
                size="sm"
                variant="light"
              >
                ➕ New Task
              </Button>
            )}

            {/* Show back button only on non-home pages */}
            {location.pathname !== "/" && (
              <Button component={Link} to="/" size="sm" variant="subtle">
                ← Back
              </Button>
            )}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
