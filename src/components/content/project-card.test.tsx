import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/components/content/project-card";
import { projects } from "@/content/projects";

describe("ProjectCard", () => {
  it("links a project to its case study", () => {
    render(<ProjectCard project={projects[0]} />);
    expect(
      screen.getByRole("link", { name: projects[0].title }),
    ).toHaveAttribute("href", `/projects/${projects[0].slug}`);
  });

  it("renders mode-specific previews when configured", () => {
    render(<ProjectCard project={projects[0]} />);

    const previews = screen.getAllByRole("img", {
      name: projects[0].visual?.alt,
    });

    expect(previews).toHaveLength(2);
    expect(
      new URL(
        previews[0].getAttribute("src") ?? "",
        "http://localhost",
      ).searchParams.get("url"),
    ).toBe("/images/projects/personal-website/preview-light.png");
    expect(
      new URL(
        previews[1].getAttribute("src") ?? "",
        "http://localhost",
      ).searchParams.get("url"),
    ).toBe("/images/projects/personal-website/preview-dark.png");
    expect(screen.getByText(projects[0].visual?.caption ?? "")).toBeVisible();
  });

  it("renders one preview when only a default source is configured", () => {
    const project = {
      ...projects[0],
      visual: {
        src: "/images/projects/default.png",
        alt: "Default project preview",
        width: 1440,
        height: 900,
      },
    };

    render(<ProjectCard project={project} />);

    expect(
      screen.getByRole("img", { name: project.visual.alt }),
    ).toHaveAttribute("src", expect.stringContaining("default.png"));
  });
});
