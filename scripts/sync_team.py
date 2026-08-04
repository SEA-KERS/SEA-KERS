import csv
import json
import os

def sync_team():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    csv_path = os.path.join(base_dir, 'team.csv')
    team_img_dir = os.path.join(base_dir, 'public', 'images', 'team')
    ts_path = os.path.join(base_dir, 'src', 'data', 'teamData.ts')

    os.makedirs(team_img_dir, exist_ok=True)

    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found.")
        return

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    team_members = []
    for row in rows:
        member_id = row.get('id', '').strip()
        if not member_id:
            continue

        # Check for local image in public/images/team/
        local_img = None
        for ext in ['.jpg', '.jpeg', '.png', '.webp']:
            test_path = os.path.join(team_img_dir, f"{member_id}{ext}")
            if os.path.exists(test_path):
                local_img = f"/images/team/{member_id}{ext}"
                break

        avatar = local_img if local_img else row.get('avatar', '').strip() or f"/images/team/{member_id}.jpg"

        member = {
            'id': member_id,
            'name': row.get('name', '').strip(),
            'avatar': avatar
        }
        if row.get('linkedin', '').strip():
            member['linkedin'] = row.get('linkedin', '').strip()

        team_members.append(member)

    core_team = team_members[:6]
    other_team = team_members[6:]

    def format_js_array(members_list):
        lines = ["[\n"]
        for m in members_list:
            lines.append("  {\n")
            lines.append(f"    id: {json.dumps(m['id'])},\n")
            lines.append(f"    name: {json.dumps(m['name'])},\n")
            if 'linkedin' in m: lines.append(f"    linkedin: {json.dumps(m['linkedin'])},\n")
            lines.append(f"    avatar: {json.dumps(m['avatar'])},\n")
            lines.append("  },\n")
        lines.append("]")
        return "".join(lines)

    core_js = format_js_array(core_team)
    other_js = format_js_array(other_team)

    with open(ts_path, 'r', encoding='utf-8') as f:
        ts_content = f.read()

    core_marker = "export const CORE_TEAM_DATA: readonly TeamMember[] = "
    other_marker = "export const TEAM_MEMBERS_DATA: readonly TeamMember[] = "
    team_data_marker = "export const TEAM_DATA: readonly TeamMember[] = "

    core_start = ts_content.find(core_marker)
    other_start = ts_content.find(other_marker)
    team_data_start = ts_content.find(team_data_marker)

    if core_start != -1 and other_start != -1 and team_data_start != -1:
        new_content = ts_content[:core_start]
        new_content += f"export const CORE_TEAM_DATA: readonly TeamMember[] = {core_js};\n\n"
        new_content += f"export const TEAM_MEMBERS_DATA: readonly TeamMember[] = {other_js};\n\n"
        new_content += "export const TEAM_DATA: readonly TeamMember[] = [\n  ...CORE_TEAM_DATA,\n  ...TEAM_MEMBERS_DATA,\n];\n"

        with open(ts_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully synced {len(team_members)} real team members to src/data/teamData.ts!")
    else:
        print("Error: Could not locate TEAM markers in src/data/teamData.ts")

if __name__ == '__main__':
    sync_team()
