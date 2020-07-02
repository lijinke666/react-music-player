module.exports = {
  "branch": "master",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/git",
      {
        // ci 发布 npm 后 更新 package.json 的 版本
        "assets": ["package.json"],
        "message": "chore(release): 🤖 ${nextRelease.version} [ci skip] ${nextRelease.notes}"
      }
    ],
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
  "preset": "angular"
}
