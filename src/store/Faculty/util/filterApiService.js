export function FilterApiResponseServiceDataVersion(response, options = {}) {
  let data = response.data.data;

  if (options.dataExtractor) {
    data = options.dataExtractor(response);
  }

  return { data: data, status: response.status };
}
