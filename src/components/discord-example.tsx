"use client"

import { AnimatedList } from "./ui/animated-list"
import { DiscordMessage } from "./discord-message"
import { MockDiscordUI } from "./mock-discord-ui"

export const DiscordExample = () => {
  return (
    <div className="relative bg-brand-25 pb-4">
      <div className="absolute inset-x-0 bottom-24 top-24 bg-brand-700" />
      <div className="relative mx-auto">
        <div className="relative">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <MockDiscordUI>
              <AnimatedList>
                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="ArchCloudHub Avatar"
                  username="ArchCloudHub"
                  timestamp="Today at 12:35PM"
                  badgeText="Alert"
                  badgeColor="#ff6b6b"
                  title="🚨 High CPU Usage Detected"
                  content={{
                    "Instance": "prod-api-01",
                    "CPU Usage": "92%",
                    "Duration": "5 minutes",
                    "Status": "Critical"
                  }}
                />
                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="ArchCloudHub Avatar"
                  username="ArchCloudHub"
                  timestamp="Today at 12:34PM"
                  badgeText="Deployment"
                  badgeColor="#4ecdc4"
                  title="🚀 Deployment Successful"
                  content={{
                    "Service": "web-frontend",
                    "Version": "v2.1.0",
                    "Environment": "Production",
                    "Duration": "45 seconds"
                  }}
                />
                <DiscordMessage
                  avatarSrc="/brand-asset-profile-picture.png"
                  avatarAlt="ArchCloudHub Avatar"
                  username="ArchCloudHub"
                  timestamp="Today at 12:33PM"
                  badgeText="Security"
                  badgeColor="#6c5ce7"
                  title="🔒 Security Update Required"
                  content={{
                    "Component": "nginx",
                    "Current Version": "1.20.1",
                    "Required Version": "1.20.2",
                    "Priority": "High"
                  }}
                />
              </AnimatedList>
            </MockDiscordUI>
          </div>
        </div>
      </div>
    </div>
  )
}