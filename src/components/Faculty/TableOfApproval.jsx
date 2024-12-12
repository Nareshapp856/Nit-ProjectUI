import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { fc_fetchSubTopics, fc_fetchTopics } from "../../store/Faculty/api";
import { useTopicsList } from "../../context/Faculty/topicsListContext";
import TopicName from "../../pages/QuestionDB/topic/TopicName";

const columnHelper = createColumnHelper();

const TableComponent = ({
  disableEdit,
  tableData = [],
  setTableData,
  edit,
  setIsTableDirty,
  isTableDirty,
  setDisableSubmit,
  disableSubmit,
  disableAdd,
  setDisableAdd,
  updateDeletedItems,
  setSelectedTopic,
  setModuleError
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [editableRow, setEditableRow] = useState(
    tableData && tableData[0]?.first ? 0 : null
  );

  const { topicsList, selectedModule,subTopicsList, fetchSubTopics, setSubTopicsList } =
    useTopicsList();

  //const topicsList = useMemo(() => ["Topic 1", "Topic 2", "Topic 3"], []);
  // const subTopicsList = useMemo(
  //   () => ["SubTopic 1", "SubTopic 2", "SubTopic 3"],
  //   []
  // );

  useEffect(() => {
    if (editableRow !== null) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [setDisableSubmit, editableRow, setEditableRow]);

  useEffect(() => {
    if (!isTableDirty && edit) setEditableRow(false);
  }, []);

  const handleEdit = useCallback(
    (index, row) => {
      fetchSubTopics(row?.topics);
      if (!isTableDirty) setIsTableDirty(true);
      setEditableRow(index);
    },
    [isTableDirty]
  );

  const handleDelete = useCallback(
    (record) => {
      if (disableSubmit) {
        setDisableSubmit(false);
      }

      updateDeletedItems(record);

      setTableData((prev) => {
        const updatedData = prev.filter(
          (item) => item.sessionNumber !== record.sessionNumber
        );

        // it is a requirement but also too expensive for making it work through parent so i'm doing this for now.
        if (updatedData.length === 0) setTimeout(() => setEditableRow(0), 100);

        return updatedData.map((item, index) => ({
          ...item,
          sessionNumber: `${index + 1}`,
        }));
      });
    },
    [disableSubmit, setTableData]
  );

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updatedData = Array.from(tableData);
    const [movedItem] = updatedData.splice(source.index, 1);

    updatedData.splice(destination.index, 0, movedItem);

    const reorderedData = updatedData.map((item, index) => ({
      ...item,
      sessionNumber: `${index + 1}`,
    }));
    setTableData(reorderedData);
  };

  const handleAddRecord = useCallback(
    (data) => {
      const newIndex = Number(data?.sessionNumber) || 0;

      // To Make sure that user don't add multiple records without filling them.
      if (
        (tableData[newIndex] && tableData[newIndex].topics.length === 0) ||
        tableData[newIndex]?.subTopics.length === 0
      ) {
        return;
      }

      const newRow = {
        sessionNumber: `${newIndex + 1}`,
        topics: [],
        subTopics: [],
      };

      setTableData((prev) => {
        const updatedData = [...prev];

        updatedData.splice(newIndex, 0, newRow);

        return updatedData.map((item, index) => ({
          ...item,
          sessionNumber: `${index + 1}`,
        }));
      });

      if (!isTableDirty) setIsTableDirty(true);

      // doing this to fix a bug (caused if we have 2 records when i add new record in middle and delete it and add one at the bottom)
      if (tableData.length < newIndex) {
        setEditableRow(tableData.length);
      } else setEditableRow(newIndex);
    },
    [tableData, setTableData, isTableDirty]
  );

  // to delete something...
  const handleCancel = (index) => {
    setEditableRow(null);
    setTableData((prev) => {
      let arr = [...prev];
      arr.splice(index, 1);

      return arr.map((item, idx) => ({
        ...item,
        sessionNumber: idx + 1,
      }));
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInputChange = useCallback(
    (index, key, value, options) => {
      let existingRecord;

      setTableData((prev) => {
        const updatedData = [...prev];

        // it use to be just updatedData[index]["subTopics"] = [] without condition
        // i added condition just in case i don't know why i'm statically changing data
        if (key === "topics") updatedData[index]["subTopics"] = [];

        // check for duplicate data
        if (key === "topics") {
          existingRecord = tableData.find((record) => {
            if (typeof record.topics === "object")
              return record.topics[0] === value;
            else return record.topics === value;
          });

          if (existingRecord) {
            setSnackbarOpen(true);
            setSnackbarMessage(
              `Topic already exists with session number ${existingRecord.sessionNumber}`
            );
          } else {
            setSubTopicsList([]);
            updatedData[index][key] = value;
          }
        } else {
          updatedData[index][key] = value;
        }
        return updatedData;
      });

      if (!existingRecord) {
        setIsTableDirty(true);
        if (key === "topics") {
          fetchSubTopics(options.topicId);
        }
      }
    },
    [setTableData, tableData]
  );

  const getTopicIdByName = (name, list) => {
    return list.find((item) => item.TopicName === name).TopicID || 0;
  };

  const handleSave = useCallback(
    (index) => {
      const validateTopic = tableData[index]?.topics;
      const validateSubTopics = tableData[index]?.subTopics;

      if (
        !validateTopic ||
        validateSubTopics?.length === 0 ||
        !validateSubTopics
      )
        return;
      if (!isTableDirty) setIsTableDirty(true);
      setEditableRow(null);
    },
    [tableData]
  );

  const handleOpen=()=>{
    if(selectedModule === '' || selectedModule === undefined || selectedModule === null){
      setModuleError("please select module");
    }
    else{
      setModuleError(null);
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("sessionNumber", {
        header: <p className="">{`Session - ${tableData?.length}`}</p>,
        cell: (info) => {
          if (info.row.index === editableRow) {
            return (
              <TextField
                defaultValue={info.row.original.sessionNumber}
                disabled
                onChange={(e) =>
                  handleInputChange(
                    info.row.index,
                    "sessionNumber",
                    e.target.value
                  )
                }
              />
            );
          }
          return info.getValue();
        },
        width: 100,
      }),
      columnHelper.accessor("topics", {
        header: "Topic",
        cell: (info) => {
          if (info.row.index === editableRow) {
            return (
              <FormControl fullWidth>
                <InputLabel id="select-topic-label">Select A Topic</InputLabel>
                <Select
                  labelId="select-topic-label"
                  id="select-topic"
                  label="Select A Topic"
                  fullWidth
                  autoFocus
                  value={info.row.original.topics}
                  onOpen={handleOpen}
                  onChange={(e) => {
                    const selectedTopicName = e.target.value;

                    const topicId = getTopicIdByName(
                      selectedTopicName,
                      topicsList
                    );
                    handleInputChange(
                      info.row.index,
                      "topics",
                      e.target.value,
                      {
                        topicId: topicId,
                      }
                    );

                    setSelectedTopic({
                      TopicId: topicId,
                      TopicName: selectedTopicName,
                    });

                    
                  }}
                >
                  {topicsList.length > 0 ? (
                    topicsList?.map((topic) => {
                      return (
                        <MenuItem key={topic.TopicName} value={topic.TopicName}>
                          {topic.TopicName}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem disabled>"No Topic found"</MenuItem>
                  )}
                </Select>
              </FormControl>
            );
          }
          return info.getValue();
        },
        width: 250,
      }),
      columnHelper.accessor("subTopics", {
        header: "Sub Topic",
        cell: (info) => {
          if (info.row.index === editableRow) {
            return (
              <FormControl fullWidth sx={{ maxWidth: 400 }}>
                <InputLabel id="select-subtopic-label">
                  Select A SubTopic
                </InputLabel>
                <Select
                  labelId="select-subtopic-label"
                  id="select-subtopic"
                  multiple
                  fullWidth
                  value={info.row.original.subTopics || []}
                  label="Select A SubTopic"
                  onChange={(e) =>
                    handleInputChange(
                      info.row.index,
                      "subTopics",
                      e.target.value
                    )
                  }
                 
                  renderValue={(selected) => selected.join(", ")}
                >
                  {subTopicsList.length > 0 ? (
                    subTopicsList.map((subTopic) => (
                      <MenuItem
                        key={subTopic.SubTopicName}
                        value={subTopic.SubTopicName}
                      >
                        <Checkbox
                          checked={info.row.original.subTopics?.includes(
                            subTopic.SubTopicName
                          )}
                        />
                        <ListItemText primary={subTopic.SubTopicName} />
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No SubTopic Found</MenuItem>
                  )}
                </Select>
              </FormControl>
            );
          }
          return (
            <div
              className="line-clamp-1"
              onClick={() => {
                setEditableRow(info.row.index);
              }}
            >
              {info.getValue().join(", ")}
            </div>
          );
        },
        width: 250,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) =>
          info.row.index === editableRow ? (
            <div>
              <IconButton
                color="success"
                onClick={() => handleSave(info.row.index)}
              >
                <DoneAllIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleCancel(info.row.index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ) : (
            <Stack direction="row">
              {!disableEdit && (
                <IconButton
                  disabled={editableRow}
                  color="primary"
                  onClick={() => handleEdit(info.row.index, info.row.original)}
                >
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                disabled={editableRow}
                color="error"
                onClick={() => handleDelete(info.row.original)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                disabled={editableRow}
                color="success"
                onClick={() => {
                  handleAddRecord(info.row.original);
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Stack>
          ),
        width: 100,
      }),
    ],
    [
      editableRow,
      handleEdit,
      handleDelete,
      handleAddRecord,
      handleInputChange,
      handleSave,
      topicsList,
      subTopicsList,
      disableEdit,
    ]
  );

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Auto close after 4 seconds
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: "420px", position: "fixed", top: 10, right: 10 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <TableContainer
              component={Paper}
              sx={{
                overflowX: "auto",
                maxHeight: 500,
                minWidth: 900,
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    {table.getHeaderGroups().map((headerGroup) =>
                      headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          style={{ width: header.column.columnDef.width }}
                          sx={{
                            fontWeight: "bold",
                            backgroundColor: "rgba(30, 64, 175, 0.8)",
                            color: "#ffffff",
                            border: "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableCell>
                      ))
                    )}
                  </TableRow>
                </TableHead>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <TableBody
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {table.getRowModel().rows.map((row, index) => (
                        <Draggable
                          key={row.id}
                          draggableId={row.id}
                          index={index}
                        >
                          {(provided) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell
                                  key={cell.id}
                                  sx={{ padding: "10px" }}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default memo(TableComponent);
