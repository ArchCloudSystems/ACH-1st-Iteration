import { Header } from "@/components/header"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 py-16 bg-white">
        <MaxWidthWrapper>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Documentation
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Learn how to integrate and use ArchCloudHub in your infrastructure.
            </p>

            <div className="mt-12 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Installation</h3>
                    <p className="mt-2 text-gray-600">
                      Install our SDK using npm:
                    </p>
                    <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                      <code>npm install @archcloudhub/sdk</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
                    <p className="mt-2 text-gray-600">
                      Initialize the SDK with your API key:
                    </p>
                    <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                      <code>{`import { ArchCloudHub } from '@archcloudhub/sdk'

const client = new ArchCloudHub({
  apiKey: 'your_api_key_here'
})`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">Monitoring Events</h2>
                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Sending Events</h3>
                    <p className="mt-2 text-gray-600">
                      Track deployments, system metrics, and other events:
                    </p>
                    <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                      <code>{`await client.track({
  type: 'deployment',
  service: 'web-frontend',
  environment: 'production',
  version: 'v2.1.0',
  metadata: {
    duration: '45s',
    status: 'success'
  }
})`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Real-time Alerts</h3>
                    <p className="mt-2 text-gray-600">
                      Configure alert thresholds and notification channels:
                    </p>
                    <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                      <code>{`await client.createAlert({
  name: 'High CPU Usage',
  metric: 'cpu_usage',
  threshold: 90,
  duration: '5m',
  channels: ['discord', 'email']
})`}</code>
                    </pre>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900">API Reference</h2>
                <div className="mt-4">
                  <Tabs defaultValue="events" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="events">Events API</TabsTrigger>
                      <TabsTrigger value="alerts">Alerts API</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics API</TabsTrigger>
                      <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="events" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Track Events</h3>
                          <p className="mt-2 text-gray-600">
                            Send monitoring events to ArchCloudHub.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`POST /api/v1/events

{
  "type": "deployment",
  "service": "web-frontend",
  "environment": "production",
  "version": "v2.1.0",
  "metadata": {
    "duration": "45s",
    "status": "success"
  }
}`}</code>
                          </pre>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">List Events</h3>
                          <p className="mt-2 text-gray-600">
                            Retrieve a list of events with optional filtering.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`GET /api/v1/events?type=deployment&service=web-frontend

Response:
{
  "events": [
    {
      "id": "evt_123",
      "type": "deployment",
      "service": "web-frontend",
      "timestamp": "2024-03-20T12:00:00Z",
      "metadata": { ... }
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}`}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="alerts" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Create Alert Rule</h3>
                          <p className="mt-2 text-gray-600">
                            Configure new alert rules with custom thresholds.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`POST /api/v1/alerts

{
  "name": "High CPU Usage",
  "description": "Alert when CPU usage exceeds 90%",
  "metric": "cpu_usage",
  "threshold": 90,
  "duration": "5m",
  "channels": ["discord", "email"],
  "severity": "critical"
}`}</code>
                          </pre>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Manage Alert Rules</h3>
                          <p className="mt-2 text-gray-600">
                            Update or delete existing alert rules.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`# Update alert rule
PATCH /api/v1/alerts/:id
{
  "threshold": 95,
  "channels": ["discord", "email", "slack"]
}

# Delete alert rule
DELETE /api/v1/alerts/:id`}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="metrics" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Submit Metrics</h3>
                          <p className="mt-2 text-gray-600">
                            Send system metrics for monitoring and analysis.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`POST /api/v1/metrics

{
  "service": "web-frontend",
  "instance": "prod-1",
  "metrics": [
    {
      "name": "cpu_usage",
      "value": 75.5,
      "unit": "percent",
      "timestamp": "2024-03-20T12:00:00Z"
    },
    {
      "name": "memory_usage",
      "value": 2048,
      "unit": "mb",
      "timestamp": "2024-03-20T12:00:00Z"
    }
  ]
}`}</code>
                          </pre>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Query Metrics</h3>
                          <p className="mt-2 text-gray-600">
                            Retrieve and analyze metric data with advanced querying.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`GET /api/v1/metrics?
  service=web-frontend&
  metric=cpu_usage&
  from=2024-03-19T00:00:00Z&
  to=2024-03-20T00:00:00Z&
  interval=5m

Response:
{
  "metric": "cpu_usage",
  "datapoints": [
    {
      "timestamp": "2024-03-19T00:00:00Z",
      "value": 65.2
    },
    {
      "timestamp": "2024-03-19T00:05:00Z",
      "value": 68.7
    }
  ],
  "statistics": {
    "avg": 66.95,
    "max": 68.7,
    "min": 65.2
  }
}`}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="integrations" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Configure Integration</h3>
                          <p className="mt-2 text-gray-600">
                            Set up integrations with external services.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`POST /api/v1/integrations

{
  "type": "slack",
  "name": "Team Notifications",
  "config": {
    "webhook_url": "https://hooks.slack.com/...",
    "channel": "#monitoring",
    "username": "ArchCloudHub"
  },
  "events": ["deployment", "alert"]
}`}</code>
                          </pre>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Manage Integrations</h3>
                          <p className="mt-2 text-gray-600">
                            List and manage your service integrations.
                          </p>
                          <pre className="mt-4 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                            <code>{`# List integrations
GET /api/v1/integrations

Response:
{
  "integrations": [
    {
      "id": "int_123",
      "type": "slack",
      "name": "Team Notifications",
      "status": "active",
      "created_at": "2024-03-20T12:00:00Z"
    }
  ]
}

# Test integration
POST /api/v1/integrations/:id/test

# Delete integration
DELETE /api/v1/integrations/:id`}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </section>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  )
}