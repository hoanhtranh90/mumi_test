import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { Form, Input, Textarea, Icon, CheckBox, Body, Text, ListItem } from 'native-base';
import _ from 'lodash';
import {
  CREATE_LABELS_PH,
  IMPORTANT,
  SERVICES,
  HANHCHINH_TYPE,
  // FLOW_INFO,
} from 'eoffice/constants/administrative';
import colors from 'eoffice/utils/colors';
import Picker from 'eoffice/components/Picker';
import styles from './MeetingForm.style';
import DatePicker from '../../common/DatePicker';
// import Utilities from '../../common/Utilities.container';
import IconField from '../../common/IconField';

const MeetingForm = ({
  listFreeRooms,
  actionList,
  detail,
  roomSelected,
  setValue,
  state,
  type,
}) => {
  const [services, setServices] = useState(
    SERVICES.map(service => ({ ...service, checked: false }))
  );
  const [rooms, setRooms] = useState([]);

  async function getListRoomFree(startTime, endTime) {
    const roomFree = await listFreeRooms({ startTime, endTime });
    if (!_.isNull(roomFree) && !_.isEmpty(roomFree.dataRoomFree)) {
      const list = _.orderBy(roomFree.dataRoomFree, ['roomName'], ['asc']);
      setRooms(list);
    }
  }

  function fillDataForm() {
    setValue('title', detail.meetingTitle);
    setValue('content', detail.meetingContent);
    setValue('startDate', new Date(detail.startTime));
    setValue('endDate', new Date(detail.endTime));
    setValue('participant', detail.otherInvolved);
    let serviceList = [];
    const serviceList2 = [];
    if (!_.isEmpty(detail.services)) {
      serviceList = detail.services.split(',');
    }
    _.forEach(services, obj => {
      const object = obj;
      _.forEach(serviceList, obj2 => {
        if (obj2 === object.value) {
          object.checked = true;
        }
      });
      serviceList2.push(object);
    });
    setServices(serviceList2);

    _.forEach(IMPORTANT, obj => {
      if (obj.value === detail.criticalLevel) {
        setValue('important', obj);
      }
    });

    if (!_.isNull(detail.note)) {
      setValue('note', detail.note);
    }
  }

  useEffect(() => {
    if (type === HANHCHINH_TYPE.DETAIL) {
      fillDataForm();
      getListRoomFree(detail.startTime, detail.endTime);
    }
  }, []);

  const selectIcon = (
    <Icon
      name="chevron-down"
      type="Feather"
      style={{ fontSize: 16, color: '#fff', marginRight: 0 }}
    />
  );

  function onChangeServices(index) {
    if (type === HANHCHINH_TYPE.CREATE) {
      services[index].checked = !services[index].checked;
      setServices(services);
      setValue('services', services);
    }
  }

  function onChangeStartDate(date) {
    setValue('startDate', date);

    if (!_.isNull(date) && !_.isNull(state.endDate)) {
      getListRoomFree(date.getTime(), state.endDate.getTime());
    }
  }

  function onChangeEndDate(date) {
    setValue('endDate', date);

    if (!_.isNull(state.startDate) && !_.isNull(date)) {
      getListRoomFree(state.startDate.getTime(), date.getTime());
    }
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Form style={styles.form}>
            <IconField label={CREATE_LABELS_PH.title} iconName="alert-circle" required>
              <Input
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.title}
                onChangeText={txt => setValue('title', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.input}
              />
            </IconField>
            <IconField label={CREATE_LABELS_PH.content} iconName="alert-circle" required>
              <Textarea
                rowSpan={4}
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.content}
                onChangeText={txt => setValue('content', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.textarea}
              />
            </IconField>
            <IconField label={CREATE_LABELS_PH.startDate} iconName="clock" required>
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={state.startDate}
                onChange={date => onChangeStartDate(date)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
              />
            </IconField>
            <IconField label={CREATE_LABELS_PH.endDate} iconName="clock" required>
              <DatePicker
                placeholderStyle={styles.pickerPlaceholder}
                style={styles.picker}
                textStyle={styles.pickerText}
                value={state.endDate}
                onChange={date => onChangeEndDate(date)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
              />
            </IconField>
            <IconField label={CREATE_LABELS_PH.participant} iconName="users">
              <Textarea
                rowSpan={4}
                placeholder="-"
                placeholderTextColor={colors.gray}
                value={state.participant}
                onChangeText={txt => setValue('participant', txt)}
                disabled={!(type === HANHCHINH_TYPE.CREATE)}
                style={styles.textarea}
              />
            </IconField>
            <IconField label={CREATE_LABELS_PH.important} iconName="star" required>
              <Picker
                mode="dropdown"
                iosIcon={selectIcon}
                style={styles.picker}
                placeholder="-"
                placeholderStyle={styles.pickerPlaceholder}
                textStyle={styles.pickerText}
                selectedValue={state.important}
                onValueChange={val => setValue('important', val)}
                enabled={type === HANHCHINH_TYPE.CREATE}
                items={IMPORTANT.map(data => ({
                  label: data.text,
                  value: data,
                }))}
              />
            </IconField>
            <IconField label={CREATE_LABELS_PH.service} iconName="bell">
              {services.map((data, index) => (
                <ListItem
                  style={{ marginLeft: 0, flexShrink: 1, width: 300 }}
                  key={data.id}
                  noBorder
                  onPress={() => onChangeServices(index)}
                >
                  <CheckBox checked={data.checked} onPress={() => onChangeServices(index)} />
                  <Body>
                    <Text>{data.text}</Text>
                  </Body>
                </ListItem>
              ))}
            </IconField>

            {type === HANHCHINH_TYPE.DETAIL && (
              <>
                <IconField label={CREATE_LABELS_PH.roomNameSelected} iconName="box" required>
                  <Input
                    placeholder="-"
                    placeholderTextColor={colors.gray}
                    value={roomSelected?.roomName}
                    disabled
                    style={styles.input}
                  />
                </IconField>
                {actionList.length !== 0 && (
                  <IconField label={CREATE_LABELS_PH.newRoomNameSelected} iconName="box" required>
                    <Picker
                      mode="dropdown"
                      iosIcon={selectIcon}
                      style={styles.picker}
                      placeholder="-"
                      placeholderStyle={styles.pickerPlaceholder}
                      textStyle={styles.pickerText}
                      selectedValue={state.newRoom}
                      onValueChange={val => setValue('newRoom', val)}
                      items={rooms.map(data => ({
                        label: data.roomName,
                        value: data,
                      }))}
                    />
                  </IconField>
                )}
                <IconField label={CREATE_LABELS_PH.note} iconName="file" required>
                  <Input
                    placeholder="-"
                    placeholderTextColor={colors.gray}
                    value={state.note}
                    onChangeText={txt => setValue('note', txt)}
                    disabled={actionList.length === 0}
                    style={styles.input}
                  />
                </IconField>
              </>
            )}

            {type === HANHCHINH_TYPE.CREATE && (
              <>
                <IconField label={CREATE_LABELS_PH.roomName} iconName="box" required>
                  <Picker
                    mode="dropdown"
                    iosIcon={selectIcon}
                    style={styles.picker}
                    placeholder="-"
                    placeholderStyle={styles.pickerPlaceholder}
                    textStyle={styles.pickerText}
                    selectedValue={state.room}
                    onValueChange={val => setValue('room', val)}
                    items={rooms.map(data => ({
                      label: data.roomName,
                      value: data,
                    }))}
                  />
                </IconField>
                <IconField label={CREATE_LABELS_PH.note} iconName="file" required>
                  <Input
                    placeholder="-"
                    placeholderTextColor={colors.gray}
                    value={state.note}
                    onChangeText={txt => setValue('note', txt)}
                    style={styles.input}
                  />
                </IconField>
              </>
            )}

            {/* <Utilities state={state} flowCode={FLOW_INFO.PHONG_HOP_DX} /> */}
          </Form>
        </View>
      </ScrollView>
    </View>
  );
};

MeetingForm.propTypes = {
  setValue: PropTypes.func,
  state: PropTypes.shape({}),
  detail: PropTypes.shape({}),
  roomSelected: PropTypes.shape({}),
  type: PropTypes.number,
  listFreeRooms: PropTypes.func,
  actionList: PropTypes.arrayOf(PropTypes.shape({})),
};
MeetingForm.defaultProps = {
  setValue() {},
  state: {},
  detail: {},
  roomSelected: null,
  type: HANHCHINH_TYPE.CREATE,
  listFreeRooms() {},
  actionList: [],
};

export default MeetingForm;
