# {{ .Title }}

> {{ partial "utils/description.html" . }}

Source: {{ .Permalink }}
{{- if not .Date.IsZero }}
Published: {{ .Date.Format "2006-01-02" }}{{ end }}
Updated: {{ .Lastmod.Format "2006-01-02" }}

{{ if in .RawContent "{{<" }}{{ .Plain }}{{ else }}{{ .RawContent }}{{ end }}
